import Video from "../models/Video";
import User from "../models/User";
//callback -> 무언가 발생하고 난 뒤 호출되는 function
//현재 mongoose는 callback을 지원하지 않고 무조건 promise를 사용해야한다

export const home = async (req, res) => {
    try {
        // {}만 입력되어 있으면 모든 형식을 찾는다
        // videos 는 doc의 이름(출력할 object의 이름)
        // await를 find 앞에 적으면 fin는 callback을 필요하지 않다고 인식
        // await는 DB를 기다려줌(무조건 위에서 아래 순서로 출력)
        const videos = await Video.find({}).sort({ createdAt: "desc" });
        res.render("home", { pageTitle: "Home", videos });
    } catch {
        return res.render("server-error");
    }
}

export const watch = async (req, res) => {
    // const id = req.params.id;
    const { id } = req.params;
    // populate로 owner의 내용을 모두가져온다. owner는 videoschema에서 User 형식이라고 설정해줌
    const video = await Video.findById(id).populate("owner");
    console.log(video);
    if(!video) {
        return res.render("404", { pageTitle: "Video not found." });
    }
    return res.render("watch", { pageTitle : video.title, video });
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const { 
        user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    if(!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    // 비디오 업로더와 로그인한 유저가 같지않다면 메인으로 redirect
    // video.onwer 의 type은 object 이고 _id의 type은 string이기 때문에 데이터형식을 맞춰줘야한다.
    if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { 
        user: { _id },
    } = req.session;
    //POST 형식으로 보낸 form의 value
    const { title, description, hashtags } = req.body;
    //video object를 받는대신 exists로 필터를 걸어서 true, false를 가져옴
    const video = await Video.exists({_id: id});
    if(!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
    const { 
        user: { _id },
    } = req.session;
    const { path: fileUrl } = req.file;
    const { title, description, hashtags } = req.body;
    // await 는 명령이 끝나기 전까지 밑의 줄을 실행하지 않음
    // (promise)
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl,
            owner: _id,
            hashtags: Video.formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect("/");
    } catch(error) {
        return res.status(400).render("upload", { 
            pageTitle: "Upload Video", 
            errorMessage: error._message, 
        });
    }
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const { 
        user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    if(!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                //contain 방식의 regex 생성
                $regex: new RegExp(keyword, "i")
            },
        })
    }
    return res.render("search", {pageTitle: "Search", videos });
}