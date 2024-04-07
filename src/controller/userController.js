import User from "../models/User";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const postJoin = async (req, res) => {
    const {name, username, email, password, password2, location} = req.body;
    const pageTitle = "Join";
    if(password !== password2) {
        return res.status(400).render("join", {
            pageTitle,    
            errorMessage: "Password confirmation does not match.",
        });
    }
    //exist -> 중복체크
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if(exists) {
        // 기본적으로 status를 설정해두지 않으면 200(성공)으로 서버에서 처리하기 때문에
        // 구글 크롬이나 엣지 같은 브라우저에서는 자동으로 패스워드 저장같은 기능을 지원한다.
        // 그래서 status를 400으로 설정해 해당 팝업이 안뜨게 설정해줌
        return res.status(400).render("join", {
            pageTitle,    
            errorMessage: "This email is already taken.",
        });
    }

    await User.create({
        name, 
        username, 
        email, 
        password, 
        location,
    });

    res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");