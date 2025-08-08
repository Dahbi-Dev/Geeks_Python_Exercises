const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const Parser = require('rss-parser');
const app = express();
const port = 3000;

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './public');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize RSS parser
const parser = new Parser();
const RSS_URL = 'https://thefactfile.org/feed/';

// Helper function to get RSS feed data
async function getRSSFeed() {
  try {
    const feed = await parser.parseURL(RSS_URL);
    return feed;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return null;
  }
}

// Helper function to extract categories from RSS items
function extractCategories(items) {
  const categories = new Set();
  items.forEach(item => {
    if (item.categories) {
      item.categories.forEach(cat => categories.add(cat));
    }
  });
  return Array.from(categories).sort();
}

// Routes
// Home route - display all posts
app.get('/', async (req, res) => {
  try {
    const feed = await getRSSFeed();
    if (feed) {
      console.log(`Feed Title: ${feed.title}`);
      console.log(`Number of items: ${feed.items.length}`);
      
      // Log first few items for testing
      feed.items.slice(0, 3).forEach(item => {
        console.log(`${item.title}: ${item.link}`);
      });
      
      res.render('pages/index', {
        title: feed.title || 'RSS Facts Feed',
        posts: feed.items || []
      });
    } else {
      res.render('pages/index', {
        title: 'RSS Facts Feed',
        posts: []
      });
    }
  } catch (error) {
    console.error('Error in home route:', error);
    res.render('pages/index', {
      title: 'RSS Facts Feed',
      posts: []
    });
  }
});

// Search page - display search forms
app.get('/search', async (req, res) => {
  try {
    const feed = await getRSSFeed();
    const categories = feed ? extractCategories(feed.items) : [];
    
    res.render('pages/search', {
      title: 'Search Posts',
      posts: [],
      categories: categories,
      searchPerformed: false
    });
  } catch (error) {
    console.error('Error in search route:', error);
    res.render('pages/search', {
      title: 'Search Posts',
      posts: [],
      categories: [],
      searchPerformed: false
    });
  }
});

// Search by title
app.post('/search/title', async (req, res) => {
  try {
    const searchTitle = req.body.title.toLowerCase();
    const feed = await getRSSFeed();
    const categories = feed ? extractCategories(feed.items) : [];
    
    let filteredPosts = [];
    if (feed && searchTitle) {
      filteredPosts = feed.items.filter(item => 
        item.title.toLowerCase().includes(searchTitle)
      );
    }
    
    res.render('pages/search', {
      title: 'Search Results',
      posts: filteredPosts,
      categories: categories,
      searchPerformed: true,
      searchType: 'title',
      searchTerm: req.body.title
    });
  } catch (error) {
    console.error('Error in title search:', error);
    res.render('pages/search', {
      title: 'Search Posts',
      posts: [],
      categories: [],
      searchPerformed: false
    });
  }
});

// Search by category
app.post('/search/category', async (req, res) => {
  try {
    const searchCategory = req.body.category;
    const feed = await getRSSFeed();
    const categories = feed ? extractCategories(feed.items) : [];
    
    let filteredPosts = [];
    if (feed && searchCategory) {
      filteredPosts = feed.items.filter(item => 
        item.categories && item.categories.includes(searchCategory)
      );
    }
    
    res.render('pages/search', {
      title: 'Search Results',
      posts: filteredPosts,
      categories: categories,
      searchPerformed: true,
      searchType: 'category',
      searchTerm: searchCategory
    });
  } catch (error) {
    console.error('Error in category search:', error);
    res.render('pages/search', {
      title: 'Search Posts',
      posts: [],
      categories: [],
      searchPerformed: false
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  
  // Test RSS feed connection on startup
  getRSSFeed().then(feed => {
    if (feed) {
      console.log(`Successfully connected to RSS feed: ${feed.title}`);
    } else {
      console.log('Failed to connect to RSS feed');
    }
  });
});