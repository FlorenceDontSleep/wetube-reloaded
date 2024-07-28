import multer from "multer"

export const localsMiddleware = (req, res, next) => {
    //locals는 자동적으로 view에 import 되어있음
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "WeTube";
    //loggedInUser가 undefined일 경우 페이지에서 에러가 발생하기 때문에 빈 object를 넣어줌
    res.locals.loggedInUser = req.session.user || {};
    //middleware 함수의 callback
    //next가 없으면 페이지가 멈춤
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        return next();
    }
    else {
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    }
    else {
        return res.redirect("/");
    }
};

export const  uploadFiles = multer({
    dest: "uploads/"
});