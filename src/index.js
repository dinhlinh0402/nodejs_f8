const express = require("express");
const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars");
const methodOverride = require('method-override');
const app = express();
const port = 3000;

// Import Middleware
const SortMiddleware = require('./app/middlewares/sortMiddleware');

const router = require('./routes');

// Import db
const db = require('./config/db');

// Connect to DB
db.connect();

// HTTP logger
app.use(morgan('combined'));

// Apply Custom Middleware
app.use(SortMiddleware);

// Template engine
// app.engine('handlebars', handlebars());
// Datj lai duoi file handlebars
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        // helpers: {
        //     sum: (a,b) => a + b,
        //     sortable: (field, sort) => {
        //         const sortType = field === sort.column ? sort.type : 'default';

        //         const icons = {
        //             default: 'oi oi-elevator',
        //             asc: 'oi oi-sort-ascending',
        //             desc: 'oi oi-sort-descending',
        //         };
        //         const types = {
        //             default: 'desc',
        //             asc: 'desc',
        //             desc: 'asc',
        //         }

        //         const icon = icons[sortType];
        //         const type = types[sortType]

        //         return `<a href="?_sort&column=${field}&type=${type}">
        //                     <span class="${icon}"></span>
        //                 </a>`
        //     },
        // },
        helpers: require('./helpers/handlebars'),
    }),
);
// app.set('view engine', 'handlebars'); // dat cho cai ung dung express cais view engine laf handlebars
// Sau khi doi duoi handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'resources', 'views'));
// console.log(__dirname);
// console.log('PATH: ', path.join(__dirname, 'resources/views'));

// Static File
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
// Lay form Data
app.use(
    express.urlencoded({
        extended: true,
    }),
); // gui duoi dang form HTML
app.use(express.json()); // gui duoi dang code JavaScript

app.use(methodOverride('_method'));

// Middleware

// app.get('/middleware', 
//     function(req,res,next) {
//         if(['vethuong', 'vevip'].includes(req.query.ve))
//         req.face = 'Gach gach gach!!!';
//             return next();
//         res.status(403).json({message: 'Access denied'});
//     },
//     function(req, res, next) {
//         res.json({
//             message: 'Successfully',
//             face: req.face
//         });
// });

// Tất cả các ứng dụng đều phải đi qua bác bảo vệ 
// app.use(bacBaoVe);

// function bacBaoVe(req,res,next) {
//     if(['vethuong', 'vevip'].includes(req.query.ve)) {
//     req.face = 'Gach gach gach!!!';
//         return next();
//     }
//     res.status(403).json({message: 'Access denied'});
// };

// app.get('/', (req, res) => {
//   return res.send('Hello World!'+ 'Linh dz')
// });
// tuong duong voi
// app.get('/', function (req, res) {
//     return res.send('Hello World!')
// })

// app.get('/', (req, res) => {
//    res.render('home');
// });

// app.get('/news', (req, res) => {
//   console.log(req.query.q);
//   res.render('news');
// });

// Action --> Dispatcher --> Function handler
// app.get('/search', (req, res) => {
//   // console.log(req.query.q);
//   res.render('search');
// });

// app.post('/search', (req, res) => {
//   console.log(req.body);
//   res.send('');
// });

// Routes init
router(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port} `);
});

// Su dung Template Engines (handlebars) giup chung ta viet cac ma chua File HTML gon gang hon, chia layout
