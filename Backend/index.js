let express = require('express');
const router = require('./Route/Route'); // ✅ fixed import
const Connection = require('./Connection/Connection');
const cookieParser = require('cookie-parser');
const path = require('path')

let app = express();

// DB Connection
Connection("mongodb+srv://Onexhib:Onexhib@cluster0.01lxubr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('✅ Database connection has been established');
  })
  .catch((e) => console.log('❌ DB error:', e));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use( express.static(path.resolve("company_uploads")));
// Routes
app.use('/', router); // ✅ router now works

// Server
app.listen(8000, () => console.log('🚀 Server Started at Port 8000'));
