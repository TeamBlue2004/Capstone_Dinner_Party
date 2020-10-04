const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const multer = require('multer');
// const uuidv4 = require('uuid/v4');
const cookieParser = require('cookie-parser');

const { User, Session } = require('../db/Models/index');

// const upload_dir = './uploads';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, upload_dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuidv4()}-${file.filename.toLowerCase}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == 'image/png' ||
//       file.mimetype == 'image/jpg' ||
//       file.mimetype == 'image/jpeg'
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   }
// });

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const findUserBySession = (sessionId) =>
  User.findOne({
    include: [
      {
        model: Session,
        where: {
          id: sessionId,
        },
      },
    ],
  });

app.use(async (req, res, next) => {
  if (!req.cookies.session_id) {
    const session = await Session.create();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;

    res.cookie('session_id', session.id, {
      path: '/',
      expires: new Date(Date.now() + oneWeek),
    });

    req.session_id = session.id;

    next();
  } else {
    req.session_id = req.cookies.session_id;
    const user = await findUserBySession(req.session_id);
    if (user) {
      req.user = user;
    }

    next();
  }
});

module.exports = {
  app,
  express,
};
