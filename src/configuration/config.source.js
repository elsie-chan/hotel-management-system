import session from 'express-session';
import express from "express";
import morgan from "morgan";
import ejs from "ejs";
import path from "path";
import url from "url";


const configSource = (app) => {
    app.set('view engine', 'ejs');
    app.use('ejs', ejs.renderFile);

    app.use(morgan('combined'));

    const __dirname = path.join(process.cwd(), 'src');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }))

    app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));
}

export default configSource;