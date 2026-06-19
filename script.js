// ── DOM Element References ──────────────────────────────────
const form                  = document.getElementById('search-form');
const queryEl               = document.getElementById('query');
const statusEl              = document.getElementById('status');
const resultsRoot           = document.getElementById('results-root');
const backBtn               = document.getElementById('back-btn');
const appShell              = document.getElementById('app-shell');
const sidebarToggleBtn      = document.getElementById('sidebar-toggle-btn');
const sidebarOverlay        = document.getElementById('sidebar-overlay');
const homeView              = document.getElementById('home-view');
const categoryView          = document.getElementById('category-view');
const favoriteView          = document.getElementById('favorite-view');
const libraryView           = document.getElementById('library-view');
const settingsView          = document.getElementById('settings-view');

const coverEl               = document.getElementById('cover');
const badgeEl               = document.getElementById('badge');
const titleEl               = document.getElementById('title');
const authorsEl             = document.getElementById('authors');
const publisherEl           = document.getElementById('publisher');
const isbnEl                = document.getElementById('isbn');
const pagesEl               = document.getElementById('pages');
const categoriesEl          = document.getElementById('categories');
const publishedEl           = document.getElementById('published');
const descriptionEl         = document.getElementById('description');
const findPdfBtn            = document.getElementById('find-pdf-btn');

// Retailer Links
const detailRetailersGrid   = document.getElementById('detail-retailers-grid');
const shopOnlineBtn         = document.getElementById('shop-online-btn');

const recoGrid              = document.getElementById('reco-grid');
const popularGrid           = document.getElementById('popular-grid');
const popularViewAllBtn     = document.getElementById('popular-view-all-btn');
const categoryGrid          = document.getElementById('category-grid');
const viewAllBtn            = document.getElementById('view-all-btn');
const mainPageTitle         = document.getElementById('main-page-title');

// Sidebar Navigation Items
const navDiscover           = document.getElementById('nav-discover');
const navCategory           = document.getElementById('nav-category');
const navFavorite           = document.getElementById('nav-favorite');
const navLibrary            = document.getElementById('nav-library');
const navSetting            = document.getElementById('nav-setting');

// Topbar Elements
const notifBellBtn          = document.getElementById('notif-bell-btn');
const notifBadge            = document.getElementById('notif-badge');
const notifDropdown         = document.getElementById('notif-dropdown');
const notifList             = document.getElementById('notif-list');
const clearNotifBtn         = document.getElementById('clear-notif-btn');

// Category Dropdown
const searchCatDropdownBtn  = document.getElementById('search-cat-dropdown-btn');
const searchCatSelected     = document.getElementById('search-cat-selected');
const searchCatMenu         = document.getElementById('search-cat-menu');

// Split View elements
const bookResultsList       = document.getElementById('book-results-list');
const searchCountEl         = document.getElementById('search-count');
const resultsPanelTitle     = document.getElementById('results-panel-title');
const resultsLayout         = document.getElementById('results-layout');
const detailCol             = document.querySelector('.detail-col');
const genreBooksCount       = document.getElementById('genre-books-count');
const genreSectionTitle     = document.getElementById('genre-section-title');

// Detail Panel Action Buttons
const favToggleBtn          = document.getElementById('fav-toggle-btn');
const shareBookBtn          = document.getElementById('share-book-btn');
const sortSelect            = document.getElementById('sort-select');
const readingStatusSelect   = document.getElementById('reading-status-select');
const progressControl       = document.getElementById('progress-control');
const progressSlider        = document.getElementById('progress-slider');
const progressLabel         = document.getElementById('progress-label');
const similarBooksSection   = document.getElementById('similar-books-section');
const similarBooksRow       = document.getElementById('similar-books-row');
const recentGrid            = document.getElementById('recent-grid');
const clearRecentBtn        = document.getElementById('clear-recent-btn');
const recentSectionHeader   = document.getElementById('recent-section-header');
const libraryGrid           = document.getElementById('library-grid');
const libraryCountEl        = document.getElementById('library-count');
const readingGoalInput      = document.getElementById('reading-goal-input');
const exportDataBtn         = document.getElementById('export-data-btn');
const importDataBtn         = document.getElementById('import-data-btn');
const importFileInput       = document.getElementById('import-file-input');
const shortcutsPanel        = document.getElementById('shortcuts-panel');
const closeShortcutsBtn     = document.getElementById('close-shortcuts-btn');

// Category View page elements
const genreBar              = document.getElementById('genre-bar');
const genreBooksGrid        = document.getElementById('genre-books-grid');
const genreLoading          = document.getElementById('genre-loading');

// Library Grid counters
const favoriteGrid          = document.getElementById('favorite-grid');
const favoriteCountEl       = document.getElementById('favorite-count');

// Settings Elements
const darkModeToggle        = document.getElementById('dark-mode-toggle');
const profileAvatarSelect   = document.getElementById('profile-avatar-select');
const profileAvatarPreview  = document.getElementById('profile-avatar-preview');
const profileNameInput      = document.getElementById('profile-name-input');
const saveProfileBtn        = document.getElementById('save-profile-btn');
const resetDataBtn          = document.getElementById('reset-data-btn');

// ── State Initialization ─────────────────────────────────────
let currentBooks = [];
let activeIndex  = 0;
let currentSearchCategory = ''; // empty means "All"

const STORAGE_KEYS = {
  FAVORITES: 'brh_favorites',
  LIBRARY: 'brh_library',
  SETTINGS: 'brh_settings',
  NOTIFICATIONS: 'brh_notifications',
  RATINGS: 'brh_ratings',
  SHOWN_BOOKS: 'brh_shown_books',
  RECENT: 'brh_recent'
};

const state = {
  favorites: JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [],
  library: JSON.parse(localStorage.getItem(STORAGE_KEYS.LIBRARY)) || {},
  ratings: JSON.parse(localStorage.getItem(STORAGE_KEYS.RATINGS)) || {},
  recent: JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT)) || [],
  settings: JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || {
    theme: 'light',
    user: { name: 'Book Reader', avatar: '👤' },
    readingGoal: 12
  },
  notifications: JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || []
};

let activeLibraryTab = 'reading';

// ── Demo Content ─────────────────────────────────────────────
const SAMPLE_BOOKS = [
  {
    title: 'The Secret Garden',
    author_name: ['Frances Hodgson Burnett'],
    publisher: ['Frederick A. Stokes Company'],
    first_publish_year: 1911,
    number_of_pages_median: 324,
    subject: ['Children', 'Gardens', 'Classics'],
    first_sentence: ['When Mary Lennox was sent to Misselthwaite Manor to live with her uncle, she was a very sour-faced little girl.'],
    isbn: ['9780141321060'],
    language: ['eng'],
    cover_i: 8234684,
    ia: ['secretgarden00burn'],
    key: '/works/OL18583W'
  },
  {
    title: 'The Secret History',
    author_name: ['Donna Tartt'],
    publisher: ['Random House'],
    first_publish_year: 1992,
    number_of_pages_median: 561,
    subject: ['Modern literature', 'Mystery', 'Campus life'],
    first_sentence: ['The snow in the mountains was impossible to judge.'],
    isbn: ['9781400079278'],
    language: ['eng'],
    cover_i: 8234672,
    key: '/works/OL82563W'
  },
  {
    title: 'Pride and Prejudice',
    author_name: ['Jane Austen'],
    publisher: ['T. Egerton'],
    first_publish_year: 1813,
    number_of_pages_median: 432,
    subject: ['Romance', 'Classics', 'Fiction'],
    first_sentence: ['It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.'],
    isbn: ['9780141439518'],
    language: ['eng'],
    cover_i: 8739161,
    key: '/works/OL66554W'
  },
  {
    title: '1984',
    author_name: ['George Orwell'],
    publisher: ['Secker & Warburg'],
    first_publish_year: 1949,
    number_of_pages_median: 328,
    subject: ['Dystopia', 'Political Fiction', 'Classics'],
    first_sentence: ['It was a bright cold day in April, and the clocks were striking thirteen.'],
    isbn: ['9780451524935'],
    language: ['eng'],
    cover_i: 8575708,
    key: '/works/OL1168007W'
  },
  // Additional books for more variety
  {
    title: 'To Kill a Mockingbird',
    author_name: ['Harper Lee'],
    publisher: ['J. B. Lippincott & Co.'],
    first_publish_year: 1960,
    number_of_pages_median: 336,
    subject: ['Fiction', 'Classics', 'Southern Gothic', 'Legal Drama'],
    first_sentence: ['When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow.'],
    isbn: ['9780061120084'],
    language: ['eng'],
    cover_i: 8531456,
    key: '/works/OL109876W'
  },
  {
    title: 'The Great Gatsby',
    author_name: ['F. Scott Fitzgerald'],
    publisher: ['Charles Scribner\'s Sons'],
    first_publish_year: 1925,
    number_of_pages_median: 180,
    subject: ['Fiction', 'Classics', 'American Literature', 'Jazz Age'],
    first_sentence: ['In my younger and more vulnerable years my father gave me some advice that I\'ve been turning over in my mind ever since.'],
    isbn: ['9780743273565'],
    language: ['eng'],
    cover_i: 8234567,
    key: '/works/OL109877W'
  },
  {
    title: 'One Hundred Years of Solitude',
    author_name: ['Gabriel García Márquez'],
    publisher: ['Harper & Row'],
    first_publish_year: 1967,
    number_of_pages_median: 417,
    subject: ['Fiction', 'Magical Realism', 'Classics', 'Latin American Literature'],
    first_sentence: ['Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.'],
    isbn: ['9780060883287'],
    language: ['eng'],
    cover_i: 8456789,
    key: '/works/OL109878W'
  },
  {
    title: 'The Catcher in the Rye',
    author_name: ['J.D. Salinger'],
    publisher: ['Little, Brown and Company'],
    first_publish_year: 1951,
    number_of_pages_median: 277,
    subject: ['Fiction', 'Classics', 'Coming-of-age', 'American Literature'],
    first_sentence: ['If you really want to hear about it, the first thing you\'ll probably want to know is where I was born, and what my lousy childhood was like.'],
    isbn: ['9780316769488'],
    language: ['eng'],
    cover_i: 8345678,
    key: '/works/OL109879W'
  },
  {
    title: 'Brave New World',
    author_name: ['Aldous Huxley'],
    publisher: ['Chatto & Windus'],
    first_publish_year: 1932,
    number_of_pages_median: 288,
    subject: ['Science Fiction', 'Dystopia', 'Classics', 'Philosophical Fiction'],
    first_sentence: ['A squat grey building of only thirty-four stories rose above the surrounding buildings.'],
    isbn: ['9780060850524'],
    language: ['eng'],
    cover_i: 8567890,
    key: '/works/OL109880W'
  },
  {
    title: 'The Hobbit',
    author_name: ['J.R.R. Tolkien'],
    publisher: ['George Allen & Unwin'],
    first_publish_year: 1937,
    number_of_pages_median: 310,
    subject: ['Fantasy', 'Adventure', 'Classics', 'Children\'s Literature'],
    first_sentence: ['In a hole in the ground there lived a hobbit.'],
    isbn: ['9780547928227'],
    language: ['eng'],
    cover_i: 8678901,
    key: '/works/OL109881W'
  },
  {
    title: 'Jane Eyre',
    author_name: ['Charlotte Brontë'],
    publisher: ['Smith, Elder & Co.'],
    first_publish_year: 1847,
    number_of_pages_median: 500,
    subject: ['Romance', 'Classics', 'Gothic Fiction', 'Victorian Literature'],
    first_sentence: ['There was no possibility of taking a walk that day.'],
    isbn: ['9780141441146'],
    language: ['eng'],
    cover_i: 8789012,
    key: '/works/OL109882W'
  },
  {
    title: 'The Lord of the Rings',
    author_name: ['J.R.R. Tolkien'],
    publisher: ['George Allen & Unwin'],
    first_publish_year: 1954,
    number_of_pages_median: 1178,
    subject: ['Fantasy', 'Adventure', 'Classics', 'Epic'],
    first_sentence: ['When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.'],
    isbn: ['9780544003415'],
    language: ['eng'],
    cover_i: 8890123,
    key: '/works/OL109883W'
  },
  {
    title: 'Animal Farm',
    author_name: ['George Orwell'],
    publisher: ['Secker & Warburg'],
    first_publish_year: 1945,
    number_of_pages_median: 112,
    subject: ['Political Satire', 'Classics', 'Allegory', 'Fiction'],
    first_sentence: ['Mr. Jones, of the Manor Farm, had locked the hen-houses for the night, but was too drunk to remember to shut the pop-holes.'],
    isbn: ['9780451526342'],
    language: ['eng'],
    cover_i: 8901234,
    key: '/works/OL109884W'
  },
  {
    title: 'Wuthering Heights',
    author_name: ['Emily Brontë'],
    publisher: ['Thomas Cautley Newby'],
    first_publish_year: 1847,
    number_of_pages_median: 416,
    subject: ['Romance', 'Classics', 'Gothic Fiction', 'Tragedy'],
    first_sentence: ['1801. I have just returned from a visit to my landlord—the solitary neighbour that I shall be troubled with.'],
    isbn: ['9780141439556'],
    language: ['eng'],
    cover_i: 8012345,
    key: '/works/OL109885W'
  },
  {
    title: 'The Odyssey',
    author_name: ['Homer'],
    publisher: ['Ancient Greece'],
    first_publish_year: -800,
    number_of_pages_median: 541,
    subject: ['Epic Poetry', 'Classics', 'Mythology', 'Adventure'],
    first_sentence: ['Sing to me of the man, muse, the man of twists and turns driven time and again off course, once he had plundered the hallowed heights of Troy.'],
    isbn: ['9780140268867'],
    language: ['eng'],
    cover_i: 8123456,
    key: '/works/OL109886W'
  },
  {
    title: 'Crime and Punishment',
    author_name: ['Fyodor Dostoevsky'],
    publisher: ['The Russian Messenger'],
    first_publish_year: 1866,
    number_of_pages_median: 671,
    subject: ['Psychological Fiction', 'Classics', 'Russian Literature', 'Philosophy'],
    first_sentence: ['On an exceptionally hot evening early in July a young man came out of the garret in which he lodged in S. Place and walked slowly, as though in hesitation, towards K. bridge.'],
    isbn: ['9780143058144'],
    language: ['eng'],
    cover_i: 8234567,
    key: '/works/OL109887W'
  },
  {
    title: 'The Alchemist',
    author_name: ['Paulo Coelho'],
    publisher: ['HarperOne'],
    first_publish_year: 1988,
    number_of_pages_median: 208,
    subject: ['Fiction', 'Philosophy', 'Spirituality', 'Adventure'],
    first_sentence: ['The boy\'s name was Santiago.'],
    isbn: ['9780062315007'],
    language: ['eng'],
    cover_i: 8345678,
    key: '/works/OL109888W'
  },
  {
    title: 'Dune',
    author_name: ['Frank Herbert'],
    publisher: ['Chilton Books'],
    first_publish_year: 1965,
    number_of_pages_median: 688,
    subject: ['Science Fiction', 'Fantasy', 'Adventure', 'Politics'],
    first_sentence: ['In the week before their departure to Arrakis, when all the final scurrying about had reached a nearly unbearable frenzy, an old crone came to visit the mother of the boy, Paul.'],
    isbn: ['9780441172719'],
    language: ['eng'],
    cover_i: 8456789,
    key: '/works/OL109889W'
  },
  {
    title: 'Frankenstein',
    author_name: ['Mary Shelley'],
    publisher: ['Lackington, Hughes, Harding, Mavor & Jones'],
    first_publish_year: 1818,
    number_of_pages_median: 280,
    subject: ['Gothic Fiction', 'Horror', 'Classics', 'Science Fiction'],
    first_sentence: ['Letter 1: To Mrs. Saville, England. St. Petersburgh, Dec. 11th, 17—. You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings.'],
    isbn: ['9780141439471'],
    language: ['eng'],
    cover_i: 8567890,
    key: '/works/OL109890W'
  },
  {
    title: 'Dracula',
    author_name: ['Bram Stoker'],
    publisher: ['Archibald Constable and Company'],
    first_publish_year: 1897,
    number_of_pages_median: 418,
    subject: ['Gothic Fiction', 'Horror', 'Classics', 'Vampire'],
    first_sentence: ['3 May. Bistritz.—Left Munich at 8:35 P.M., on 7th May, evening and arriving at Vienna early next morning.'],
    isbn: ['9780141439846'],
    language: ['eng'],
    cover_i: 8678901,
    key: '/works/OL109891W'
  },
  {
    title: 'The Picture of Dorian Gray',
    author_name: ['Oscar Wilde'],
    publisher: ['Lippincott\'s Monthly Magazine'],
    first_publish_year: 1890,
    number_of_pages_median: 254,
    subject: ['Philosophical Fiction', 'Classics', 'Gothic Fiction', 'Aestheticism'],
    first_sentence: ['The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn from the orchard.'],
    isbn: ['9780141439570'],
    language: ['eng'],
    cover_i: 8789012,
    key: '/works/OL109892W'
  },
  {
    title: 'Moby-Dick',
    author_name: ['Herman Melville'],
    publisher: ['Harper & Brothers'],
    first_publish_year: 1851,
    number_of_pages_median: 635,
    subject: ['Adventure', 'Classics', 'American Literature', 'Sea Story'],
    first_sentence: ['Call me Ishmael.'],
    isbn: ['9780142437247'],
    language: ['eng'],
    cover_i: 8890123,
    key: '/works/OL109893W'
  },
  {
    title: 'War and Peace',
    author_name: ['Leo Tolstoy'],
    publisher: ['The Russian Messenger'],
    first_publish_year: 1869,
    number_of_pages_median: 1225,
    subject: ['Historical Fiction', 'Classics', 'Russian Literature', 'War'],
    first_sentence: ['"Well, Prince, so Genoa and Lucca are now no more than family estates of the Buonapartes."'],
    isbn: ['9780143039990'],
    language: ['eng'],
    cover_i: 8901234,
    key: '/works/OL109894W'
  },
  {
    title: 'Anna Karenina',
    author_name: ['Leo Tolstoy'],
    publisher: ['The Russian Messenger'],
    first_publish_year: 1877,
    number_of_pages_median: 864,
    subject: ['Romance', 'Classics', 'Russian Literature', 'Tragedy'],
    first_sentence: ['Happy families are all alike; every unhappy family is unhappy in its own way.'],
    isbn: ['9780143035008'],
    language: ['eng'],
    cover_i: 8012345,
    key: '/works/OL109895W'
  },
  {
    title: 'The Brothers Karamazov',
    author_name: ['Fyodor Dostoevsky'],
    publisher: ['The Russian Messenger'],
    first_publish_year: 1880,
    number_of_pages_median: 796,
    subject: ['Philosophical Fiction', 'Classics', 'Russian Literature', 'Religion'],
    first_sentence: ['Alexei Fyodorovitch Karamazov was the third son of Fyodor Pavlovitch Karamazov, a land owner well known in our district in his own day and still remembered among us.'],
    isbn: ['9780374528379'],
    language: ['eng'],
    cover_i: 8123456,
    key: '/works/OL109896W'
  },
  {
    title: 'Les Misérables',
    author_name: ['Victor Hugo'],
    publisher: ['A. Lacroix, Verboeckhoven & Cie.'],
    first_publish_year: 1862,
    number_of_pages_median: 1463,
    subject: ['Historical Fiction', 'Classics', 'French Literature', 'Social Justice'],
    first_sentence: ['In 1815, M. Charles-François-Bienvenu Myriel was Bishop of D——.'],
    isbn: ['9780451419439'],
    language: ['eng'],
    cover_i: 8234567,
    key: '/works/OL109897W'
  },
  {
    title: 'Don Quixote',
    author_name: ['Miguel de Cervantes'],
    publisher: ['Francisco de Robles'],
    first_publish_year: 1605,
    number_of_pages_median: 992,
    subject: ['Adventure', 'Classics', 'Satire', 'Spanish Literature'],
    first_sentence: ['Somewhere in La Mancha, in a place whose name I do not care to remember, a gentleman lived not long ago, one of those who has a lance and ancient shield on a shelf and keeps a skinny nag and a greyhound for racing.'],
    isbn: ['9780060934347'],
    language: ['eng'],
    cover_i: 8345678,
    key: '/works/OL109898W'
  },
  {
    title: 'The Divine Comedy',
    author_name: ['Dante Alighieri'],
    publisher: ['Medieval Italy'],
    first_publish_year: 1320,
    number_of_pages_median: 798,
    subject: ['Epic Poetry', 'Classics', 'Religion', 'Italian Literature'],
    first_sentence: ['Midway along the journey of our life I woke to find myself in a dark wood, for I had wandered off from the straight path.'],
    isbn: ['9780142437223'],
    language: ['eng'],
    cover_i: 8456789,
    key: '/works/OL109899W'
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author_name: ['Yuval Noah Harari'],
    publisher: ['Harper'],
    first_publish_year: 2014,
    number_of_pages_median: 443,
    subject: ['History', 'Science', 'Anthropology', 'Nonfiction'],
    first_sentence: ['About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang.'],
    isbn: ['9780062316097'],
    language: ['eng'],
    cover_i: 8567890,
    key: '/works/OL109900W'
  },
  {
    title: 'Educated',
    author_name: ['Tara Westover'],
    publisher: ['Random House'],
    first_publish_year: 2018,
    number_of_pages_median: 334,
    subject: ['Memoir', 'Biography', 'Nonfiction', 'Education'],
    first_sentence: ['I never went to school.'],
    isbn: ['9780399590504'],
    language: ['eng'],
    cover_i: 8678901,
    key: '/works/OL109901W'
  },
  {
    title: 'Atomic Habits',
    author_name: ['James Clear'],
    publisher: ['Avery'],
    first_publish_year: 2018,
    number_of_pages_median: 320,
    subject: ['Self-Help', 'Psychology', 'Nonfiction', 'Productivity'],
    first_sentence: ['The tiny changes you make today will compound into remarkable results over time.'],
    isbn: ['9780735211292'],
    language: ['eng'],
    cover_i: 8789012,
    key: '/works/OL109902W'
  },
  {
    title: 'The Midnight Library',
    author_name: ['Matt Haig'],
    publisher: ['Viking'],
    first_publish_year: 2020,
    number_of_pages_median: 304,
    subject: ['Fiction', 'Fantasy', 'Philosophy', 'Contemporary'],
    first_sentence: ['Between life and death there is a library, and within that library, the shelves go on forever.'],
    isbn: ['9780525559474'],
    language: ['eng'],
    cover_i: 8890123,
    key: '/works/OL109903W'
  },
  {
    title: 'Where the Crawdads Sing',
    author_name: ['Delia Owens'],
    publisher: ['G.P. Putnam\'s Sons'],
    first_publish_year: 2018,
    number_of_pages_median: 368,
    subject: ['Fiction', 'Mystery', 'Coming-of-age', 'Nature'],
    first_sentence: ['The marsh does not die.'],
    isbn: ['9780735219090'],
    language: ['eng'],
    cover_i: 8901234,
    key: '/works/OL109904W'
  }
];

const CATEGORIES = [
  { name: 'Money/Investing', query: 'money investing finance', cover_i: 8739161 },
  { name: 'Design',          query: 'design art graphic',     cover_i: 8234672 },
  { name: 'Business',        query: 'business entrepreneurship', cover_i: 8234684 },
  { name: 'Self Improvement',query: 'self improvement mindset', cover_i: 8575708 },
  { name: 'Science & Nature',query: 'science nature biology physics', cover_i: 8567890 },
  { name: 'History',         query: 'history world war ancient', cover_i: 8123456 },
  { name: 'Psychology',      query: 'psychology mind behavior', cover_i: 8789012 },
  { name: 'Technology',      query: 'technology computing programming', cover_i: 8456789 },
  { name: 'Travel',          query: 'travel adventure exploration', cover_i: 8678901 },
  { name: 'Cooking',         query: 'cooking food recipes cuisine', cover_i: 8890123 },
  { name: 'Philosophy',      query: 'philosophy ethics logic', cover_i: 8345678 },
  { name: 'Health & Fitness',query: 'health fitness wellness exercise', cover_i: 8901234 },
];

const BROWSE_GENRES = [
  { name: 'Fiction', query: 'subject:fiction' },
  { name: 'Science Fiction', query: 'subject:science_fiction' },
  { name: 'Fantasy', query: 'subject:fantasy' },
  { name: 'Mystery & Thriller', query: 'subject:mystery OR subject:thriller' },
  { name: 'Romance', query: 'subject:romance' },
  { name: 'Horror', query: 'subject:horror' },
  { name: 'History', query: 'subject:history' },
  { name: 'Biography', query: 'subject:biography' },
  { name: 'Business', query: 'subject:business' },
  { name: 'Art / Design', query: 'subject:design OR subject:art' },
  { name: 'Self Improvement', query: 'subject:self-help' },
  { name: 'Science', query: 'subject:science' },
  { name: 'Philosophy', query: 'subject:philosophy' },
  { name: 'Poetry', query: 'subject:poetry' },
  { name: 'Children', query: 'subject:juvenile OR subject:children' },
  { name: 'Graphic Novels', query: 'subject:graphic_novels OR subject:comics' }
];

let activeBrowseGenre = BROWSE_GENRES[0].name;
let categoryFullPageMode = false;

function getAllDropdownCategories() {
  const seen = new Set();
  const combined = [];
  for (const cat of [...CATEGORIES, ...BROWSE_GENRES]) {
    if (seen.has(cat.name)) continue;
    seen.add(cat.name);
    combined.push(cat);
  }
  return combined.sort((a, b) => a.name.localeCompare(b.name));
}

function renderSearchCategoryMenu() {
  if (!searchCatMenu) return;
  searchCatMenu.innerHTML = '';

  const allItem = document.createElement('div');
  allItem.className = 'cat-menu-item active';
  allItem.setAttribute('data-val', '');
  allItem.textContent = 'All Categories';
  searchCatMenu.appendChild(allItem);

  getAllDropdownCategories().forEach(cat => {
    const item = document.createElement('div');
    item.className = 'cat-menu-item';
    item.setAttribute('data-val', cat.query);
    item.textContent = cat.name;
    searchCatMenu.appendChild(item);
  });
}

// ── State Helper Actions ─────────────────────────────────────
function saveState(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function updateThemeUI() {
  if (state.settings.theme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    darkModeToggle.checked = true;
  } else {
    document.body.removeAttribute('data-theme');
    darkModeToggle.checked = false;
  }
}

function updateProfileUI() {
  profileAvatarSelect.value = state.settings.user.avatar || '👤';
  profileAvatarPreview.textContent = state.settings.user.avatar || '👤';
  profileNameInput.value = state.settings.user.name || 'Book Reader';
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '✨';
  if (type === 'success') icon = '✅';
  else if (type === 'error') icon = '❌';
  else if (type === 'warning') icon = '⚠️';
  else if (type === 'info') icon = '✨';

  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close">&times;</button>
    </div>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 50);

  // Close handlers
  const closeBtn = toast.querySelector('.toast-close');
  const closeToast = () => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove());
  };

  closeBtn.onclick = closeToast;

  // Auto close after 4s
  setTimeout(closeToast, 4000);
}

function addNotification(text) {
  const notif = {
    id: Date.now(),
    text: text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  state.notifications.unshift(notif);
  if (state.notifications.length > 20) state.notifications.pop();
  saveState(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
  renderNotifications();

  // Show visual toast popup
  let type = 'info';
  const lower = text.toLowerCase();
  if (lower.includes('error') || lower.includes('failed') || lower.includes('delete') || lower.includes('reset')) {
    type = 'warning';
  } else if (lower.includes('success') || lower.includes('add') || lower.includes('save') || lower.includes('rate') || lower.includes('favorite') || lower.includes('progress')) {
    type = 'success';
  }
  showToast(text, type);

  // Shaking bell animation
  notifBellBtn.classList.remove('pulse-bell');
  void notifBellBtn.offsetWidth; // Reflow
  notifBellBtn.classList.add('pulse-bell');
  setTimeout(() => {
    notifBellBtn.classList.remove('pulse-bell');
  }, 600);
}

function renderNotifications() {
  notifList.innerHTML = '';
  if (state.notifications.length === 0) {
    notifList.innerHTML = '<div class="notif-empty">No new notifications</div>';
    notifBadge.classList.add('hidden');
    notifBadge.textContent = '0';
    return;
  }

  notifBadge.classList.remove('hidden');
  notifBadge.textContent = state.notifications.length;

  state.notifications.forEach(n => {
    const div = document.createElement('div');
    div.className = 'notif-item';
    div.innerHTML = `<p>${n.text}</p><span class="notif-time">${n.time}</span>`;
    notifList.appendChild(div);
  });
}

function isMobileSidebar() {
  return window.innerWidth <= 900;
}

function updateSidebarUI() {
  if (sidebarOverlay) {
    const isOpen = appShell?.classList.contains('sidebar-open');
    sidebarOverlay.classList.toggle('hidden', !isMobileSidebar() || !isOpen);
  }
}

function openSidebar() {
  appShell?.classList.add('sidebar-open');
  updateSidebarUI();
}

function closeSidebar() {
  appShell?.classList.remove('sidebar-open');
  updateSidebarUI();
}

function toggleSidebar() {
  if (appShell?.classList.contains('sidebar-open')) closeSidebar();
  else openSidebar();
}

if (sidebarToggleBtn) sidebarToggleBtn.onclick = toggleSidebar;
if (sidebarOverlay) sidebarOverlay.onclick = closeSidebar;

window.addEventListener('resize', updateSidebarUI);

// ── View Switching SPA Router ────────────────────────────────
const VIEWS = {
  discover: { panel: homeView, title: 'Discover', nav: navDiscover },
  category: { panel: categoryView, title: 'Category Browse', nav: navCategory },
  favorite: { panel: favoriteView, title: 'Favorite Books', nav: navFavorite },
  library: { panel: libraryView, title: 'My Library', nav: navLibrary },
  setting: { panel: settingsView, title: 'Settings', nav: navSetting }
};

function updateSidebarIndicator(activeItem) {
  const indicator = document.getElementById('sidebar-nav-indicator');
  if (!indicator) return;
  if (!activeItem) {
    indicator.style.opacity = '0';
    return;
  }
  indicator.style.opacity = '1';
  indicator.style.top = `${activeItem.offsetTop}px`;
  indicator.style.left = `${activeItem.offsetLeft}px`;
  indicator.style.width = `${activeItem.offsetWidth}px`;
  indicator.style.height = `${activeItem.offsetHeight}px`;
}

// Recalculate on window resize
window.addEventListener('resize', () => {
  const activeNav = document.querySelector('.nav-item.active');
  updateSidebarIndicator(activeNav);
});

function updateBackButton(show) {
  if (backBtn) backBtn.classList.toggle('hidden', !show);
}

function setCategoryFullPageMode(enabled) {
  categoryFullPageMode = enabled;
  resultsLayout?.classList.toggle('results-layout--fullpage', enabled);
  detailCol?.classList.toggle('hidden', enabled);
}

function switchView(viewName) {
  // Hide details view
  resultsRoot.classList.add('hidden');
  updateBackButton(false);
  setCategoryFullPageMode(false);

  let activeNav = null;
  // Loop through tabs
  Object.keys(VIEWS).forEach(k => {
    const v = VIEWS[k];
    if (k === viewName) {
      v.panel.classList.remove('hidden');
      if (v.nav) {
        v.nav.classList.add('active');
        activeNav = v.nav;
      }
      mainPageTitle.textContent = v.title;
    } else {
      v.panel.classList.add('hidden');
      if (v.nav) v.nav.classList.remove('active');
    }
  });

  updateSidebarIndicator(activeNav);

  // Load screen data
  if (viewName === 'favorite') loadFavoritePage();
  else if (viewName === 'category') loadCategoryPage();
  else if (viewName === 'library') loadLibraryPage();
  else if (viewName === 'setting') loadSettingsPage();
  else if (viewName === 'discover') {
    renderRecentlyViewed();
  }
}

// Attach nav clicks
if (navDiscover) navDiscover.onclick = (e) => { e.preventDefault(); switchView('discover'); if (isMobileSidebar()) closeSidebar(); };
if (navCategory) navCategory.onclick = (e) => { e.preventDefault(); switchView('category'); if (isMobileSidebar()) closeSidebar(); };
if (navFavorite) navFavorite.onclick = (e) => { e.preventDefault(); switchView('favorite'); if (isMobileSidebar()) closeSidebar(); };
if (navLibrary)  navLibrary.onclick  = (e) => { e.preventDefault(); switchView('library'); if (isMobileSidebar()) closeSidebar(); };
if (navSetting)  navSetting.onclick  = (e) => { e.preventDefault(); switchView('setting'); if (isMobileSidebar()) closeSidebar(); };

if (backBtn) backBtn.onclick = () => switchView('discover');

// ── Shared Detail Navigation ─────────────────────────────────
function getBookId(book) {
  return book.key || book.isbn?.[0] || book.title;
}

function selectAndDisplayBook(book, listContext = [book]) {
  currentBooks = listContext;
  activeIndex = listContext.findIndex(b => getBookId(b) === getBookId(book));
  if (activeIndex === -1) {
    activeIndex = 0;
    currentBooks = [book, ...listContext.filter(b => getBookId(b) !== getBookId(book))];
  }

  setCategoryFullPageMode(false);

  // Hide all containers
  Object.values(VIEWS).forEach(v => v.panel.classList.add('hidden'));
  Object.values(VIEWS).forEach(v => { if (v.nav) v.nav.classList.remove('active'); });
  updateSidebarIndicator(null);

  resultsRoot.classList.remove('hidden');
  updateBackButton(true);
  mainPageTitle.textContent = 'Book Details';

  // Build Results Left side list
  renderLeftList();

  // Load details of target book
  displayBook(book);
}

function renderLeftList() {
  bookResultsList.innerHTML = '';
  searchCountEl.textContent = `${currentBooks.length.toLocaleString()} book${currentBooks.length !== 1 ? 's' : ''}`;

  if (categoryFullPageMode) {
    bookResultsList.className = 'book-items book-items--grid';

    currentBooks.forEach((book, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'book-grid-card';

      const cover = document.createElement('div');
      cover.className = 'book-grid-cover';
      const coverUrl = buildCoverUrl(book);
      if (coverUrl) cover.style.backgroundImage = `url('${coverUrl}')`;

      const info = document.createElement('div');
      info.className = 'book-grid-info';
      info.innerHTML = `<h3>${book.title || 'Unknown Title'}</h3><p>${formatAuthors(book.author_name)}</p>`;

      card.append(cover, info);
      card.onclick = () => {
        activeIndex = index;
        setCategoryFullPageMode(false);
        renderLeftList();
        displayBook(book);
        mainPageTitle.textContent = 'Book Details';
      };

      bookResultsList.appendChild(card);
    });
    return;
  }

  bookResultsList.className = 'book-items';

  currentBooks.forEach((book, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = `book-item ${index === activeIndex ? 'active' : ''}`;
    
    const coverUrl = buildCoverUrl(book);
    const coverDiv = document.createElement('div');
    coverDiv.className = 'book-item-thumbnail';
    if (coverUrl) coverDiv.style.backgroundImage = `url('${coverUrl}')`;

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'book-item-content';
    detailsDiv.innerHTML = `<h3>${book.title || 'Unknown Title'}</h3><p>${formatAuthors(book.author_name)}</p>`;

    item.append(coverDiv, detailsDiv);
    item.onclick = () => {
      activeIndex = index;
      // Mark active
      Array.from(bookResultsList.children).forEach((c, idx) => {
        c.classList.toggle('active', idx === index);
      });
      displayBook(book);
    };

    bookResultsList.appendChild(item);
  });
}

// ── Discover View ────────────────────────────────────────────
function buildCoverUrl(book) {
  // Open Library covers (primary)
  if (book.cover_i)       return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
  if (book.isbn?.length)  return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`;
  
  // Google Books cover (fallback)
  if (book.googleBooksId) return `https://books.google.com/books/content?id=${book.googleBooksId}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
  if (book.thumbnail)     return book.thumbnail.replace('zoom=1', 'zoom=2'); // Higher resolution
  
  return '';
}

// Fetch Google Books data for enhanced cover and metadata
async function fetchGoogleBooksData(query) {
  try {
    const r = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`);
    const data = await r.json();
    if (data.items?.length > 0) {
      const volume = data.items[0];
      const info = volume.volumeInfo;
      return {
        googleBooksId: volume.id,
        thumbnail: info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null,
        description: info.description,
        publisher: info.publisher,
        publishedDate: info.publishedDate,
        pageCount: info.pageCount,
        categories: info.categories,
        averageRating: info.averageRating,
        ratingsCount: info.ratingsCount
      };
    }
  } catch {}
  return null;
}

function renderBookCards(gridEl, books, maxCount = 8, options = {}) {
  if (!gridEl) return;
  gridEl.innerHTML = '';

  books.slice(0, maxCount).forEach((book) => {
    const card = document.createElement('div');
    card.className = 'reco-card';
    card.onclick = () => { selectAndDisplayBook(book, books); };

    const cover = document.createElement('div');
    cover.className = 'reco-cover';
    const url = buildCoverUrl(book);
    if (url) cover.style.backgroundImage = `url('${url}')`;

    if (options.showPopularBadge) {
      const popularBadge = document.createElement('span');
      popularBadge.className = 'reco-popular-badge';
      popularBadge.textContent = '🔥 Popular';
      cover.appendChild(popularBadge);
    }

    const bookId = getBookId(book);
    const entry = getLibraryEntry(bookId);
    if (entry) {
      const statusBadge = document.createElement('span');
      statusBadge.className = 'reco-status-badge';
      const labels = { reading: '📖 Reading', finished: '✅ Done', want: '📌 Saved' };
      statusBadge.textContent = labels[entry.status] || '';
      cover.appendChild(statusBadge);
    }

    const info = document.createElement('div');
    info.className = 'reco-info';
    const rating = state.ratings[bookId];
    const stars = rating ? `<span class="reco-rating">${'★'.repeat(rating)}</span>` : '';
    info.innerHTML = `<h3>${book.title}</h3><p>${formatAuthors(book.author_name)} ${stars}</p>`;

    card.append(cover, info);
    gridEl.appendChild(card);
  });
}

function renderHomeReco(books) {
  renderBookCards(recoGrid, books, 8);
}

async function loadPopularBooks() {
  if (!popularGrid) return;
  popularGrid.innerHTML = '<div class="section-loading">Loading popular books...</div>';

  const popularQueries = [
    { q: 'bestseller fiction', sort: 'rating' },
    { q: 'classic literature', sort: 'edition_count' },
    { q: 'popular nonfiction', sort: 'rating' }
  ];

  try {
    const allBooks = [];

    for (const { q, sort } of popularQueries) {
      try {
        const r = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&sort=${sort}&limit=8`
        );
        if (r.ok) {
          const data = await r.json();
          if (data.docs?.length) allBooks.push(...data.docs);
        }
      } catch {
        continue;
      }
      if (allBooks.length >= 16) break;
    }

    const unique = [];
    const seen = new Set();
    for (const book of allBooks) {
      const id = getBookId(book);
      if (seen.has(id)) continue;
      seen.add(id);
      unique.push(book);
    }

    const books = unique.length >= 8
      ? unique.slice(0, 12)
      : getFreshBooks([...unique, ...SAMPLE_BOOKS], 12);

    renderBookCards(popularGrid, books, 8, { showPopularBadge: true });
  } catch {
    renderBookCards(popularGrid, SAMPLE_BOOKS.slice(0, 8), 8, { showPopularBadge: true });
  }
}

function renderCategories() {
  categoryGrid.innerHTML = '';
  CATEGORIES.forEach((cat) => {
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.onclick = () => browseCategory(cat);

    const cover = document.createElement('div');
    cover.className = 'cat-cover';
    cover.style.backgroundImage = `url('https://covers.openlibrary.org/b/id/${cat.cover_i}-M.jpg')`;

    const info = document.createElement('div');
    info.className = 'cat-info';
    info.innerHTML = `<h3>${cat.name}</h3>`;

    card.append(cover, info);
    categoryGrid.appendChild(card);
  });
}

// Track shown book IDs to avoid duplicates (persisted in localStorage)
// Load previously shown book IDs from localStorage
let shownBookIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOWN_BOOKS)) || []);

// Save shown book IDs to localStorage
function saveShownBooks() {
  const ids = Array.from(shownBookIds);
  // Keep only the last 100 shown books to prevent unbounded growth
  const trimmed = ids.slice(-100);
  localStorage.setItem(STORAGE_KEYS.SHOWN_BOOKS, JSON.stringify(trimmed));
}

// Get fresh books that haven't been shown recently
function getFreshBooks(bookList, maxCount) {
  const fresh = [];
  const fallbackPool = [...SAMPLE_BOOKS];
  
  for (const book of bookList) {
    if (fresh.length >= maxCount) break;
    const id = getBookId(book);
    if (!shownBookIds.has(id)) {
      shownBookIds.add(id);
      fresh.push(book);
    }
  }
  
  // If we don't have enough fresh books, add from fallback pool
  if (fresh.length < maxCount) {
    for (const book of fallbackPool) {
      if (fresh.length >= maxCount) break;
      const id = getBookId(book);
      if (!shownBookIds.has(id)) {
        shownBookIds.add(id);
        fresh.push(book);
      }
    }
  }
  
  // If still not enough, allow recycling but prefer least recently shown
  if (fresh.length < maxCount) {
    // Clear old shown books to allow recycling
    const oldIds = Array.from(shownBookIds);
    if (oldIds.length > 50) {
      shownBookIds = new Set(oldIds.slice(-30)); // Keep only recent 30
    }
    for (const book of bookList) {
      if (fresh.length >= maxCount) break;
      const id = getBookId(book);
      if (!fresh.find(b => getBookId(b) === id)) {
        shownBookIds.add(id);
        fresh.push(book);
      }
    }
  }
  
  saveShownBooks();
  return fresh;
}

async function loadHomeReco() {
  try {
    // Fetch from multiple sources for variety
    const queries = [
      'bestseller', 
      'popular fiction', 
      'award winning', 
      'new releases',
      'classic literature',
      'popular science',
      'adventure fiction',
      'contemporary fiction'
    ];
    const allBooks = [];
    
    // Try multiple queries to get diverse results
    for (const query of queries) {
      try {
        const r = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8`);
        if (r.ok) {
          const d = await r.json();
          if (d.docs?.length) {
            allBooks.push(...d.docs);
          }
        }
      } catch (e) {
        continue;
      }
      
      // Stop if we have enough books
      if (allBooks.length >= 20) break;
    }
    
    // Get fresh books (not recently shown)
    const freshBooks = getFreshBooks(allBooks, 12);
    
    // Shuffle for more variety
    const shuffled = freshBooks.sort(() => Math.random() - 0.5);
    
    // Show more books (8 instead of 4)
    renderHomeReco(shuffled.slice(0, Math.min(8, shuffled.length)));
  } catch {
    // Show sample books with variety - pick randomly from larger pool
    const samples = getFreshBooks(SAMPLE_BOOKS.sort(() => Math.random() - 0.5), 12);
    renderHomeReco(samples.slice(0, 8));
  }
}

// ── Category View Page ───────────────────────────────────────
function browseCategory(cat) {
  queryEl.value = cat.name;
  if (cat.query) {
    currentSearchCategory = cat.query;
    searchCatSelected.textContent = cat.name;
    Array.from(searchCatMenu.children).forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-val') === cat.query);
    });
  }
  searchBook(cat.query || cat.name, { fetchAll: true, categoryName: cat.name });
}

function loadCategoryPage() {
  genreBar.innerHTML = '';
  BROWSE_GENRES.forEach(genre => {
    const btn = document.createElement('button');
    btn.className = `genre-pill ${genre.name === activeBrowseGenre ? 'active' : ''}`;
    btn.textContent = genre.name;
    btn.onclick = () => {
      activeBrowseGenre = genre.name;
      Array.from(genreBar.children).forEach(pill => {
        pill.classList.toggle('active', pill === btn);
      });
      fetchGenreBooks(genre);
    };
    genreBar.appendChild(btn);
  });

  fetchGenreBooks(BROWSE_GENRES.find(g => g.name === activeBrowseGenre));
}

async function fetchAllCategoryBooks(query, onProgress) {
  const PAGE_SIZE = 100;
  const MAX_BOOKS = 2000;
  let offset = 0;
  const allBooks = [];
  let total = null;

  while (true) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${PAGE_SIZE}&offset=${offset}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();

    if (total === null) total = data.numFound || 0;
    const docs = data.docs || [];
    if (!docs.length) break;

    allBooks.push(...docs);
    if (onProgress) onProgress(allBooks.length, total);

    offset += PAGE_SIZE;
    if (allBooks.length >= total || allBooks.length >= MAX_BOOKS || docs.length < PAGE_SIZE) break;
  }

  return allBooks;
}

async function fetchGenreBooks(genre) {
  genreLoading.classList.remove('hidden');
  genreLoading.textContent = 'Loading books...';
  genreBooksGrid.innerHTML = '';
  if (genreBooksCount) genreBooksCount.classList.add('hidden');
  if (genreSectionTitle) genreSectionTitle.textContent = genre.name;

  try {
    const books = await fetchAllCategoryBooks(genre.query, (loaded, total) => {
      genreLoading.textContent = `Loading ${loaded.toLocaleString()} of ${total.toLocaleString()} books...`;
    });

    if (!books.length) throw new Error('No books found');
    renderGenreGrid(books);
    if (genreBooksCount) {
      genreBooksCount.textContent = `${books.length.toLocaleString()} Book${books.length !== 1 ? 's' : ''}`;
      genreBooksCount.classList.remove('hidden');
    }
  } catch {
    const fallback = SAMPLE_BOOKS.filter(b =>
      b.subject?.some(s => genre.name.toLowerCase().includes(s.toLowerCase().split(' ')[0]))
    );
    renderGenreGrid(fallback.length ? fallback : SAMPLE_BOOKS);
    if (genreBooksCount) {
      genreBooksCount.textContent = `${(fallback.length ? fallback : SAMPLE_BOOKS).length} Books (offline)`;
      genreBooksCount.classList.remove('hidden');
    }
  } finally {
    genreLoading.classList.add('hidden');
  }
}

function renderGenreGrid(books) {
  genreBooksGrid.innerHTML = '';
  genreBooksGrid.className = 'category-books-fullpage';
  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'reco-card';
    card.onclick = () => { selectAndDisplayBook(book, books); };

    const cover = document.createElement('div');
    cover.className = 'reco-cover';
    const url = buildCoverUrl(book);
    if (url) cover.style.backgroundImage = `url('${url}')`;

    const info = document.createElement('div');
    info.className = 'reco-info';
    info.innerHTML = `<h3>${book.title}</h3><p>${formatAuthors(book.author_name)}</p>`;

    card.append(cover, info);
    genreBooksGrid.appendChild(card);
  });
}

// ── Collections rendering helper ─────────────────────────────
function renderCollectionHelper(gridEl, countEl, bookList, typeLabel, emptyText) {
  gridEl.innerHTML = '';
  countEl.textContent = `${bookList.length} Book${bookList.length !== 1 ? 's' : ''}`;

  if (bookList.length === 0) {
    gridEl.innerHTML = `<div class="collection-empty">${emptyText}</div>`;
    return;
  }

  bookList.forEach(book => {
    const bookId = getBookId(book);
    const card = document.createElement('div');
    card.className = 'collection-card';

    const coverWrap = document.createElement('div');
    coverWrap.className = 'coll-cover-wrap';
    const coverUrl = buildCoverUrl(book);
    if (coverUrl) coverWrap.style.backgroundImage = `url('${coverUrl}')`;

    // Is it favorited?
    const isFav = state.favorites.some(f => getBookId(f) === getBookId(book));
    if (isFav) {
      const favBadge = document.createElement('div');
      favBadge.className = 'coll-favorite-badge';
      favBadge.textContent = '❤️';
      coverWrap.appendChild(favBadge);
    }

    const meta = document.createElement('div');
    meta.className = 'coll-meta';
    meta.innerHTML = `<h3>${book.title}</h3><p>${formatAuthors(book.author_name)}</p>`;

    // Add stars if rated
    const rating = state.ratings[bookId];
    if (rating) {
      const ratingDiv = document.createElement('div');
      ratingDiv.style.color = '#fbbf24';
      ratingDiv.style.fontSize = '0.85rem';
      ratingDiv.style.marginTop = '4px';
      ratingDiv.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);
      meta.appendChild(ratingDiv);
    }

    const actions = document.createElement('div');
    actions.className = 'coll-actions';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'coll-btn-remove';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      if (typeLabel === 'favorite') {
        state.favorites = state.favorites.filter(b => getBookId(b) !== bookId);
        saveState(STORAGE_KEYS.FAVORITES, state.favorites);
        addNotification(`Unfavorited "${book.title}"`);
        loadFavoritePage();
      }
    };

    actions.append(removeBtn);
    card.append(coverWrap, meta, actions);
    gridEl.appendChild(card);
  });
}


function loadFavoritePage() {
  renderCollectionHelper(
    favoriteGrid,
    favoriteCountEl,
    state.favorites,
    'favorite',
    'You haven\'t added any favorites yet. Tap the Heart button on any book to add it here.'
  );
}

function getLibraryEntry(bookId) {
  return state.library[bookId] || null;
}

function setLibraryEntry(book, status, progress = 0) {
  const bookId = getBookId(book);
  if (!status) {
    delete state.library[bookId];
  } else {
    state.library[bookId] = {
      book,
      status,
      progress: status === 'finished' ? 100 : Math.min(100, Math.max(0, progress)),
      updatedAt: Date.now()
    };
  }
  saveState(STORAGE_KEYS.LIBRARY, state.library);
}

function getLibraryBooksByStatus(status) {
  return Object.values(state.library)
    .filter(entry => entry.status === status)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .map(entry => entry.book);
}

function addToRecent(book) {
  const bookId = getBookId(book);
  state.recent = state.recent.filter(b => getBookId(b) !== bookId);
  state.recent.unshift(book);
  if (state.recent.length > 12) state.recent = state.recent.slice(0, 12);
  saveState(STORAGE_KEYS.RECENT, state.recent);
}

function renderRecentlyViewed() {
  if (!recentGrid) return;
  recentGrid.innerHTML = '';

  if (state.recent.length === 0) {
    if (recentSectionHeader) recentSectionHeader.classList.add('hidden');
    return;
  }

  if (recentSectionHeader) recentSectionHeader.classList.remove('hidden');
  if (clearRecentBtn) clearRecentBtn.classList.remove('hidden');

  state.recent.slice(0, 6).forEach(book => {
    const card = document.createElement('div');
    card.className = 'reco-card';
    card.onclick = () => selectAndDisplayBook(book, state.recent);

    const cover = document.createElement('div');
    cover.className = 'reco-cover';
    const url = buildCoverUrl(book);
    if (url) cover.style.backgroundImage = `url('${url}')`;

    const info = document.createElement('div');
    info.className = 'reco-info';
    info.innerHTML = `<h3>${book.title}</h3><p>${formatAuthors(book.author_name)}</p>`;

    card.append(cover, info);
    recentGrid.appendChild(card);
  });
}

function loadLibraryPage() {
  document.querySelectorAll('.library-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === activeLibraryTab);
  });

  const books = getLibraryBooksByStatus(activeLibraryTab);
  libraryGrid.innerHTML = '';
  libraryCountEl.textContent = `${books.length} Book${books.length !== 1 ? 's' : ''}`;

  const emptyMessages = {
    reading: 'No books in progress. Open any book and set status to "Currently Reading".',
    finished: 'No finished books yet. Mark a book as finished when you complete it!',
    want: 'Your want-to-read list is empty. Add books from the detail page.'
  };

  if (books.length === 0) {
    libraryGrid.innerHTML = `<div class="collection-empty">${emptyMessages[activeLibraryTab]}</div>`;
    return;
  }

  books.forEach(book => {
    const bookId = getBookId(book);
    const entry = getLibraryEntry(bookId);
    const card = document.createElement('div');
    card.className = 'collection-card';

    const coverWrap = document.createElement('div');
    coverWrap.className = 'coll-cover-wrap';
    const coverUrl = buildCoverUrl(book);
    if (coverUrl) coverWrap.style.backgroundImage = `url('${coverUrl}')`;

    const meta = document.createElement('div');
    meta.className = 'coll-meta';
    meta.innerHTML = `<h3>${book.title}</h3><p>${formatAuthors(book.author_name)}</p>`;

    if (entry && entry.status === 'reading') {
      const progressBar = document.createElement('div');
      progressBar.className = 'coll-progress-bar';
      progressBar.innerHTML = `<div class="coll-progress-fill" style="width:${entry.progress}%"></div>`;
      const progressText = document.createElement('div');
      progressText.className = 'coll-progress-text';
      progressText.innerHTML = `<span>Progress</span><span>${entry.progress}%</span>`;
      meta.append(progressBar, progressText);
    }

    const rating = state.ratings[bookId];
    if (rating) {
      const ratingDiv = document.createElement('div');
      ratingDiv.style.color = '#fbbf24';
      ratingDiv.style.fontSize = '0.85rem';
      ratingDiv.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);
      meta.appendChild(ratingDiv);
    }

    const actions = document.createElement('div');
    actions.className = 'coll-actions';

    const openBtn = document.createElement('button');
    openBtn.className = 'coll-btn-read';
    openBtn.textContent = 'Open';
    openBtn.onclick = () => selectAndDisplayBook(book, books);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'coll-btn-remove';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      setLibraryEntry(book, null);
      addNotification(`Removed "${book.title}" from library`);
      loadLibraryPage();
    };

    actions.append(openBtn, removeBtn);
    card.append(coverWrap, meta, actions);
    libraryGrid.appendChild(card);
  });
}

function sortBooks(books, sortBy) {
  const sorted = [...books];
  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    case 'year-desc':
      return sorted.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    case 'year-asc':
      return sorted.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    default:
      return sorted;
  }
}

async function loadSimilarBooks(book) {
  if (!similarBooksSection || !similarBooksRow) return;
  similarBooksRow.innerHTML = '';
  similarBooksSection.classList.add('hidden');

  const subject = book.subject?.[0] || book.title?.split(' ')[0] || 'fiction';
  const author = book.author_name?.[0] || '';

  try {
    const query = author ? `author:"${author}"` : `subject:"${subject}"`;
    const r = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=6`);
    if (!r.ok) return;
    const data = await r.json();
    const similar = (data.docs || []).filter(b => getBookId(b) !== getBookId(book)).slice(0, 5);
    if (similar.length === 0) return;

    similarBooksSection.classList.remove('hidden');
    similar.forEach(b => {
      const card = document.createElement('div');
      card.className = 'similar-book-card';
      card.onclick = () => selectAndDisplayBook(b, [b, ...similar]);

      const cover = document.createElement('div');
      cover.className = 'similar-cover';
      const url = buildCoverUrl(b);
      if (url) cover.style.backgroundImage = `url('${url}')`;

      const title = document.createElement('span');
      title.className = 'similar-title';
      title.textContent = b.title;

      card.append(cover, title);
      similarBooksRow.appendChild(card);
    });
  } catch {}
}

function updateLibraryStatusUI(book) {
  if (!readingStatusSelect) return;
  const bookId = getBookId(book);
  const entry = getLibraryEntry(bookId);

  readingStatusSelect.value = entry?.status || '';

  if (progressControl && progressSlider && progressLabel) {
    if (entry && (entry.status === 'reading' || entry.status === 'finished')) {
      progressControl.classList.remove('hidden');
      progressSlider.value = entry.progress;
      progressLabel.textContent = `${entry.progress}%`;
      progressSlider.disabled = entry.status === 'finished';
    } else {
      progressControl.classList.add('hidden');
    }
  }
}

function shareBook(book) {
  const text = `${book.title} by ${formatAuthors(book.author_name)} — found on Book Reader Hub`;
  const url = book.key ? `https://openlibrary.org${book.key}` : window.location.href;

  if (navigator.share) {
    navigator.share({ title: book.title, text, url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
      addNotification('Book link copied to clipboard!');
    }).catch(() => {
      addNotification('Could not copy link.', 'error');
    });
  }
}

function exportLibraryData() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    favorites: state.favorites,
    library: state.library,
    ratings: state.ratings,
    recent: state.recent,
    settings: state.settings
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `book-reader-hub-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  addNotification('Library exported successfully!');
}

function importLibraryData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.favorites) { state.favorites = data.favorites; saveState(STORAGE_KEYS.FAVORITES, state.favorites); }
      if (data.library) { state.library = data.library; saveState(STORAGE_KEYS.LIBRARY, state.library); }
      if (data.ratings) { state.ratings = data.ratings; saveState(STORAGE_KEYS.RATINGS, state.ratings); }
      if (data.recent) { state.recent = data.recent; saveState(STORAGE_KEYS.RECENT, state.recent); }
      if (data.settings) {
        state.settings = { ...state.settings, ...data.settings };
        saveState(STORAGE_KEYS.SETTINGS, state.settings);
        updateThemeUI();
        updateProfileUI();
      }
      renderRecentlyViewed();
      addNotification('Library imported successfully!');
    } catch {
      addNotification('Invalid backup file.', 'error');
    }
  };
  reader.readAsText(file);
}

// ── Settings Handler ─────────────────────────────────────────
function loadSettingsPage() {
  updateThemeUI();
  updateProfileUI();
  if (readingGoalInput) readingGoalInput.value = state.settings.readingGoal || 12;
}

function renderSettingsView() {
  loadSettingsPage();
}

// ── Helpers ──────────────────────────────────────────────────
function formatAuthors(authors) {
  return authors?.length ? authors.join(', ') : 'Unknown author';
}

function setStatus(text, error = false) {
  statusEl.textContent = text;
  statusEl.style.color = error ? '#b91c1c' : '#7a7a7a';
}

// ── Book Detail Operations ───────────────────────────────────
async function fetchDescription(book) {
  // 1. Google Books API - Primary source for descriptions
  try {
    const searchQuery = `${book.title} ${book.author_name?.[0] || ''}`.trim();
    const r = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=1`);
    const data = await r.json();
    if (data.items?.length > 0) {
      const volumeInfo = data.items[0].volumeInfo;
      const desc = volumeInfo.description;
      if (desc && desc.length > 80) return desc;
    }
  } catch {}

  // 2. Open Library work description
  try {
    if (book.key) {
      const r = await fetch(`https://openlibrary.org${book.key}.json`);
      const d = await r.json();
      const raw = d.description;
      const text = raw ? (typeof raw === 'string' ? raw : raw.value) : null;
      if (text && text.length > 80) return text;
    }
  } catch {}

  // 3. Wikipedia extract
  try {
    const r = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(book.title)}`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (r.ok) {
      const d = await r.json();
      if (d.extract && d.extract.length > 80) return d.extract;
    }
  } catch {}

  // 4. Fallback to first sentence
  return book.first_sentence?.[0] || 'No description available.';
}

function updateDetailActionsUI(book) {
  const bookId = getBookId(book);
  const isFav = state.favorites.some(b => getBookId(b) === bookId);

  // Favorite button styling
  if (isFav) {
    favToggleBtn.textContent = '❤️ Favorited';
    favToggleBtn.classList.add('active');
  } else {
    favToggleBtn.textContent = '♡ Favorite';
    favToggleBtn.classList.remove('active');
  }
}

async function displayBook(book) {
  const bookId = getBookId(book);

  addToRecent(book);
  renderRecentlyViewed();

  // Restore button group accessibility
  const actionGroup = document.querySelector('.details-action-group');
  if (actionGroup) {
    actionGroup.style.opacity = '1';
    actionGroup.style.pointerEvents = 'auto';
  }

  // Restore cover styling
  coverEl.className = 'book-cover-large';

  // Wire up ratings system stars
  const currentRating = state.ratings[bookId] || 0;
  updateStarsUI(currentRating);

  const stars = document.querySelectorAll('.star-item');
  stars.forEach(star => {
    star.onclick = () => {
      const val = parseInt(star.getAttribute('data-rating'));
      state.ratings[bookId] = val;
      saveState(STORAGE_KEYS.RATINGS, state.ratings);
      updateStarsUI(val);
      addNotification(`You rated "${book.title}" ${val} stars!`);
    };

    star.onmouseenter = () => {
      const val = parseInt(star.getAttribute('data-rating'));
      stars.forEach(s => {
        const sVal = parseInt(s.getAttribute('data-rating'));
        s.classList.toggle('active', sVal <= val);
        s.style.transform = sVal <= val ? 'scale(1.25)' : 'scale(1)';
        s.style.transition = 'transform 0.15s, color 0.15s';
      });
    };
  });

  const ratingDeck = document.getElementById('book-star-rating');
  if (ratingDeck) {
    ratingDeck.onmouseleave = () => {
      const val = state.ratings[bookId] || 0;
      updateStarsUI(val);
      stars.forEach(s => {
        s.style.transform = 'scale(1)';
      });
    };
  }

  titleEl.textContent      = book.title || 'Unknown title';
  authorsEl.textContent    = `Author: ${formatAuthors(book.author_name)}`;
  publisherEl.textContent  = book.publisher?.length ? `Publisher: ${book.publisher[0]}` : '';
  publishedEl.textContent  = book.first_publish_year ? `First published: ${book.first_publish_year}` : '';
  pagesEl.textContent      = book.number_of_pages_median ? `Pages: ${book.number_of_pages_median}` : '';
  categoriesEl.textContent = book.subject?.length ? `Subjects: ${book.subject.slice(0, 5).join(', ')}` : '';
  
  descriptionEl.textContent = 'Loading description...';
  fetchDescription(book).then(desc => {
    descriptionEl.innerHTML = desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  });

  isbnEl.textContent       = book.isbn?.length ? `ISBN: ${book.isbn[0]}` : '';
  badgeEl.textContent      = book.language?.length ? book.language[0].toUpperCase() : '';

  const url = buildCoverUrl(book);
  coverEl.style.backgroundImage = url ? `url('${url}')` : '';

  const authorName = formatAuthors(book.author_name);
  const searchTitle = book.title || 'Unknown Title';
  const queryParam = `${searchTitle} ${authorName}`;

  findPdfBtn.classList.remove('hidden');
  findPdfBtn.onclick = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(`"${searchTitle}" "${authorName}" filetype:pdf`)}`, '_blank', 'noopener,noreferrer');
  };

  shopOnlineBtn.onclick = () => {
    window.open(`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(queryParam)}&tbs=p_ord:p`, '_blank', 'noopener,noreferrer');
  };

  detailRetailersGrid.classList.remove('hidden');

  updateDetailActionsUI(book);
  updateLibraryStatusUI(book);

  if (readingStatusSelect) {
    readingStatusSelect.onchange = () => {
      const status = readingStatusSelect.value;
      if (!status) {
        setLibraryEntry(book, null);
        updateLibraryStatusUI(book);
        addNotification(`Removed "${book.title}" from library`);
        return;
      }
      const progress = status === 'finished' ? 100 : (getLibraryEntry(bookId)?.progress || 0);
      setLibraryEntry(book, status, progress);
      updateLibraryStatusUI(book);
      const labels = { want: 'Want to Read', reading: 'Currently Reading', finished: 'Finished' };
      addNotification(`Added "${book.title}" to ${labels[status]}!`);
      if (status === 'finished') {
        const finished = getLibraryBooksByStatus('finished').length;
        const goal = state.settings.readingGoal || 12;
        if (finished >= goal) addNotification(`🎉 You hit your ${goal}-book reading goal!`);
      }
    };
  }

  if (progressSlider) {
    progressSlider.oninput = () => {
      const val = parseInt(progressSlider.value);
      progressLabel.textContent = `${val}%`;
      setLibraryEntry(book, 'reading', val);
    };
  }

  if (shareBookBtn) shareBookBtn.onclick = () => shareBook(book);

  loadSimilarBooks(book);

  favToggleBtn.onclick = () => {
    const bookId = getBookId(book);
    const isFav = state.favorites.some(b => getBookId(b) === bookId);
    if (isFav) {
      state.favorites = state.favorites.filter(b => getBookId(b) !== bookId);
      addNotification(`Unfavorited "${book.title}"`);
    } else {
      state.favorites.push(book);
      addNotification(`Favorited "${book.title}"!`);
    }
    saveState(STORAGE_KEYS.FAVORITES, state.favorites);
    updateDetailActionsUI(book);
  };
}



// Helper to display dynamic skeleton cards during load transitions
function showSearchSkeletons() {
  bookResultsList.innerHTML = '';
  searchCountEl.textContent = 'Loading...';
  
  for (let i = 0; i < 4; i++) {
    const item = document.createElement('div');
    item.className = 'book-item skeleton-pulse';
    item.style.pointerEvents = 'none';
    item.style.border = 'none';
    item.style.padding = '10px';
    item.style.marginBottom = '10px';
    item.style.height = '80px';
    item.style.borderRadius = '14px';
    bookResultsList.appendChild(item);
  }

  // Cover loading class
  coverEl.className = 'book-cover-large skeleton-pulse';
  coverEl.style.backgroundImage = 'none';
  
  // Clean elements and show loaders
  titleEl.innerHTML = '<div class="skeleton-pulse" style="height:24px; width:70%; border-radius:6px;"></div>';
  authorsEl.innerHTML = '<div class="skeleton-pulse" style="height:14px; width:45%; border-radius:4px; margin-top:8px;"></div>';
  publisherEl.innerHTML = '';
  publishedEl.innerHTML = '';
  isbnEl.innerHTML = '';
  pagesEl.innerHTML = '';
  categoriesEl.innerHTML = '';
  badgeEl.textContent = '';
  
  const actionGroup = document.querySelector('.details-action-group');
  if (actionGroup) {
    actionGroup.style.opacity = '0.3';
    actionGroup.style.pointerEvents = 'none';
  }

  descriptionEl.innerHTML = `
    <div class="skeleton-pulse" style="height:12px; width:100%; margin-bottom:8px; border-radius:4px;"></div>
    <div class="skeleton-pulse" style="height:12px; width:95%; margin-bottom:8px; border-radius:4px;"></div>
    <div class="skeleton-pulse" style="height:12px; width:65%; border-radius:4px;"></div>
  `;
  
  detailRetailersGrid.classList.add('hidden');
}

function updateStarsUI(rating) {
  const stars = document.querySelectorAll('.star-item');
  stars.forEach(s => {
    const val = parseInt(s.getAttribute('data-rating'));
    s.classList.toggle('active', val <= rating);
  });
}

// ── Search & Query Logic ─────────────────────────────────────
async function searchBook(query, options = {}) {
  const { fetchAll = false, categoryName = null } = options;

  setStatus(fetchAll ? 'Loading all books in category...' : 'Searching details...');
  Object.values(VIEWS).forEach(v => v.panel.classList.add('hidden'));
  Object.values(VIEWS).forEach(v => { if (v.nav) v.nav.classList.remove('active'); });

  resultsRoot.classList.remove('hidden');
  updateBackButton(true);
  setCategoryFullPageMode(!!fetchAll);
  showSearchSkeletons();

  if (resultsPanelTitle) {
    resultsPanelTitle.textContent = categoryName || 'Search Results';
  }
  if (categoryName) mainPageTitle.textContent = categoryName;

  try {
    if (fetchAll) {
      currentBooks = await fetchAllCategoryBooks(query, (loaded, total) => {
        setStatus(`Loading books... ${loaded.toLocaleString()} of ${total.toLocaleString()}`);
        if (searchCountEl) searchCountEl.textContent = `${loaded.toLocaleString()} loaded...`;
      });
    } else {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=100`;
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      currentBooks = data.docs || [];
    }

    if (!currentBooks.length) {
      setStatus('No books found. Try another search term.', true);
      switchView('discover');
      return;
    }
  } catch (err) {
    console.warn('Search failed, loading offline demos', err);
    setStatus('Offline mode: showing sample books.');
    currentBooks = SAMPLE_BOOKS;
  }

  activeIndex = 0;
  resultsRoot.classList.remove('hidden');
  applySortAndRender();

  if (fetchAll) {
    setStatus(`${currentBooks.length.toLocaleString()} book${currentBooks.length !== 1 ? 's' : ''} in this category`);
  } else {
    displayBook(currentBooks[0]);
    setStatus(`${currentBooks.length.toLocaleString()} book${currentBooks.length !== 1 ? 's' : ''} found`);
  }
}

function applySortAndRender() {
  const sortBy = sortSelect?.value || 'relevance';
  currentBooks = sortBooks(currentBooks, sortBy);
  activeIndex = Math.min(activeIndex, currentBooks.length - 1);
  renderLeftList();
}

// ── Init & Interactive Menu Listeners ─────────────────────────

// Search Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = queryEl.value.trim();
  if (q) {
    let searchQuery = q;
    if (currentSearchCategory) {
      searchQuery += ` AND ${currentSearchCategory}`;
    }
    searchBook(searchQuery);
  }
});

const autocompleteMenu = document.getElementById('search-autocomplete-menu');

async function fetchAutocompleteSuggestions(q) {
  if (!q) {
    autocompleteMenu.classList.add('hidden');
    return;
  }
  
  let searchQuery = q;
  if (currentSearchCategory) {
    searchQuery += ` AND ${currentSearchCategory}`;
  }
  
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=5&fields=title,author_name,cover_i,isbn,key`;
    const r = await fetch(url);
    if (!r.ok) return;
    const data = await r.json();
    
    if (!data.docs || data.docs.length === 0) {
      autocompleteMenu.innerHTML = '<div class="autocomplete-empty">No quick results found. Press Enter to search full database.</div>';
      autocompleteMenu.classList.remove('hidden');
      return;
    }
    
    renderAutocompleteItems(data.docs);
  } catch (err) {
    console.warn('Autocomplete fetch failed', err);
    const matches = SAMPLE_BOOKS.filter(b => b.title.toLowerCase().includes(q.toLowerCase()));
    if (matches.length > 0) {
      renderAutocompleteItems(matches);
    } else {
      autocompleteMenu.classList.add('hidden');
    }
  }
}

function renderAutocompleteItems(books) {
  autocompleteMenu.innerHTML = '';
  books.forEach(book => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'autocomplete-item';
    
    const coverUrl = buildCoverUrl(book);
    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'autocomplete-thumb';
    if (coverUrl) thumbDiv.style.backgroundImage = `url('${coverUrl}')`;
    
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'autocomplete-details';
    
    const titleSpan = document.createElement('span');
    titleSpan.className = 'autocomplete-title';
    titleSpan.textContent = book.title;
    
    const authorSpan = document.createElement('span');
    authorSpan.className = 'autocomplete-author';
    authorSpan.textContent = formatAuthors(book.author_name);
    
    detailsDiv.append(titleSpan, authorSpan);
    item.append(thumbDiv, detailsDiv);
    
    item.onclick = (e) => {
      e.stopPropagation();
      queryEl.value = book.title;
      autocompleteMenu.classList.add('hidden');
      selectAndDisplayBook(book, books);
    };
    
    autocompleteMenu.appendChild(item);
  });
  
  autocompleteMenu.classList.remove('hidden');
}

// Live Search typing listener (debounced)
let searchDebounceTimeout = null;
queryEl.addEventListener('input', () => {
  clearTimeout(searchDebounceTimeout);
  const q = queryEl.value.trim();
  
  if (q.length === 0) {
    switchView('discover');
    setStatus('');
    autocompleteMenu.classList.add('hidden');
    return;
  }
  
  if (q.length < 3) {
    setStatus('Type at least 3 characters to search...');
    autocompleteMenu.classList.add('hidden');
    return;
  }
  
  setStatus('Typing...');
  
  searchDebounceTimeout = setTimeout(() => {
    fetchAutocompleteSuggestions(q);
    setStatus('Press Enter to view all results');
  }, 300);
});

// View All Button
viewAllBtn.onclick = () => {
  searchBook('bestseller');
};

if (popularViewAllBtn) {
  popularViewAllBtn.onclick = () => {
    searchBook('bestseller popular', { fetchAll: true, categoryName: 'Popular Books' });
  };
}

// Search Category Dropdown toggling
if (searchCatDropdownBtn) {
  searchCatDropdownBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    searchCatMenu.classList.toggle('hidden');
    autocompleteMenu?.classList.add('hidden');
  };
}

if (searchCatMenu) {
  searchCatMenu.onclick = (e) => {
    e.stopPropagation();
    const item = e.target.closest('.cat-menu-item');
    if (!item) return;

    const val = item.getAttribute('data-val');
    const name = item.textContent.trim();
    currentSearchCategory = val;
    searchCatSelected.textContent = name;

    Array.from(searchCatMenu.children).forEach(el => {
      el.classList.toggle('active', el === item);
    });

    searchCatMenu.classList.add('hidden');

    if (val) {
      browseCategory({ name, query: val });
    }
  };
}

// Close dropdowns on click outside
document.addEventListener('click', (e) => {
  if (searchCatDropdownBtn && !searchCatDropdownBtn.contains(e.target)) {
    searchCatMenu?.classList.add('hidden');
  }
  if (notifBellBtn && !notifBellBtn.contains(e.target) && !notifDropdown?.contains(e.target)) {
    notifDropdown?.classList.add('hidden');
  }
  if (!queryEl?.contains(e.target) && !autocompleteMenu?.contains(e.target)) {
    autocompleteMenu?.classList.add('hidden');
  }
});

// Notification center toggle
notifBellBtn.onclick = (e) => {
  e.stopPropagation();
  notifDropdown.classList.toggle('hidden');
};

clearNotifBtn.onclick = (e) => {
  e.stopPropagation();
  state.notifications = [];
  saveState(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
  renderNotifications();
};

// Dark Mode Switch
darkModeToggle.onchange = (e) => {
  state.settings.theme = e.target.checked ? 'dark' : 'light';
  saveState(STORAGE_KEYS.SETTINGS, state.settings);
  updateThemeUI();
};

// Settings Save Profile
saveProfileBtn.onclick = () => {
  const name = profileNameInput.value.trim();
  const avatar = profileAvatarSelect.value;
  if (name) {
    state.settings.user.name = name;
    state.settings.user.avatar = avatar;
    saveState(STORAGE_KEYS.SETTINGS, state.settings);
    updateProfileUI();
    addNotification('Profile saved successfully.');
  }
};

profileAvatarSelect.onchange = (e) => {
  profileAvatarPreview.textContent = e.target.value;
};

// Reset Storage Data
resetDataBtn.onclick = () => {
  if (confirm('Are you sure you want to delete all offline data? This resets Favorites, ratings, library, and settings.')) {
    localStorage.clear();
    state.favorites = [];
    state.library = {};
    state.ratings = {};
    state.recent = [];
    state.settings = { theme: 'light', user: { name: 'Book Reader', avatar: '👤' }, readingGoal: 12 };
    state.notifications = [];
    
    updateThemeUI();
    updateProfileUI();
    renderNotifications();
    renderRecentlyViewed();
    switchView('discover');
    addNotification('Database successfully reset.');
  }
};

// Library tabs
document.querySelectorAll('.library-tab').forEach(tab => {
  tab.onclick = () => {
    activeLibraryTab = tab.dataset.tab;
    loadLibraryPage();
  };
});

// Sort select
if (sortSelect) {
  sortSelect.onchange = () => {
    if (currentBooks.length) {
      const currentBook = currentBooks[activeIndex];
      applySortAndRender();
      const newIndex = currentBooks.findIndex(b => getBookId(b) === getBookId(currentBook));
      activeIndex = newIndex >= 0 ? newIndex : 0;
      renderLeftList();
      if (!categoryFullPageMode) displayBook(currentBooks[activeIndex]);
    }
  };
}

// Reading goal
if (readingGoalInput) {
  readingGoalInput.onchange = () => {
    const val = parseInt(readingGoalInput.value) || 12;
    state.settings.readingGoal = Math.min(365, Math.max(1, val));
    saveState(STORAGE_KEYS.SETTINGS, state.settings);
    addNotification(`Reading goal set to ${state.settings.readingGoal} books.`);
  };
}

// Export / Import
if (exportDataBtn) exportDataBtn.onclick = exportLibraryData;
if (importDataBtn) importDataBtn.onclick = () => importFileInput?.click();
if (importFileInput) {
  importFileInput.onchange = (e) => {
    const file = e.target.files?.[0];
    if (file) importLibraryData(file);
    e.target.value = '';
  };
}

// Clear recent history
if (clearRecentBtn) {
  clearRecentBtn.onclick = () => {
    state.recent = [];
    saveState(STORAGE_KEYS.RECENT, state.recent);
    renderRecentlyViewed();
    addNotification('Recent history cleared.');
  };
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  const tag = e.target.tagName;
  const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

  if (e.key === '/' && !isInput) {
    e.preventDefault();
    queryEl.focus();
  }

  if (e.key === '?' && !isInput) {
    e.preventDefault();
    shortcutsPanel?.classList.toggle('hidden');
  }

  if (e.key === 'Escape') {
    if (appShell?.classList.contains('sidebar-open') && isMobileSidebar()) {
      closeSidebar();
      return;
    }
    shortcutsPanel?.classList.add('hidden');
    notifDropdown?.classList.add('hidden');
    searchCatMenu?.classList.add('hidden');
    autocompleteMenu?.classList.add('hidden');
    if (!resultsRoot.classList.contains('hidden')) switchView('discover');
  }

  if (!resultsRoot.classList.contains('hidden') && !isInput && currentBooks.length > 1) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, currentBooks.length - 1);
      renderLeftList();
      displayBook(currentBooks[activeIndex]);
      bookResultsList.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      renderLeftList();
      displayBook(currentBooks[activeIndex]);
      bookResultsList.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }
});

if (closeShortcutsBtn) {
  closeShortcutsBtn.onclick = () => shortcutsPanel?.classList.add('hidden');
}

// ── Startup ──────────────────────────────────────────────────
function init() {
  updateThemeUI();
  updateProfileUI();
  
  // Set up initial notification if empty
  if (state.notifications.length === 0) {
    addNotification('Welcome to Book Reader Hub! Browse collections or search titles.');
  } else {
    renderNotifications();
  }

  renderSearchCategoryMenu();
  renderCategories();
  loadPopularBooks();
  loadHomeReco();
  renderRecentlyViewed();

  // Position initial navigation indicator
  setTimeout(() => {
    const activeNav = document.querySelector('.nav-item.active');
    updateSidebarIndicator(activeNav);
  }, 150);

  closeSidebar();
}

init();
