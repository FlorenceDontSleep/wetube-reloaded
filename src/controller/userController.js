import User from "../models/User";
import bcrypt from "bcrypt";

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
    try {
        await User.create({
            name, 
            username, 
            email, 
            password, 
            location,
        });
        res.redirect("/login");
    } catch(error) {
        return res.status(400).render("join"), {
            pageTitle,
            errorMessage: error._message,
        }
    }

};
export const getLogin = (req, res) => 
    res.render("Login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username });
    if(!user) {
        return res.status(400).render("login", {
            pageTitle, 
            errorMessage: "An account with this username does not exists.",
        });
    }
    //bcrpyt의 내장 함수 compare를 통해 비빌번호를 비교하고 로그인처리
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) {
        return res.status(400).render("login", {
            pageTitle, 
            errorMessage: "Wrong password",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const startGitHubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGitHubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    //fetch를 통해 finalUrl에 POST요청을 보내고 데이터를 받아온다
    const tokenRequest = await (
        await fetch(finalUrl, {
            method:"POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();
    //access_token이 받아온 데이터 안에 있다면 github에서 fetch가 돌아오고 json으로 받음
    if("access_token" in tokenRequest) {
        const {access_token} = tokenRequest;
        const apiUrl =  "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const email = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if(!email) {
            res.redirect("/login");
        }
    }
    else {
        res.redirect("/login");
    }

    res.send(JSON.stringify(json));
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");