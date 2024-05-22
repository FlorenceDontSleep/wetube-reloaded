export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "WeTube";
    res.locals.loggedInUser = req.session.user;
    console.log(req.locals);
    //middleware 함수의 callback
    //next가 없으면 페이지가 멈춤
    next();
};
