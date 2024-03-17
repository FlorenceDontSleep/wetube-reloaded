import Video from "../models/Video";
//callback -> 무언가 발생하고 난 뒤 호출되는 function
//현재 mongoose는 callback을 지원하지 않고 무조건 promise를 사용해야한다

export const home = async (req, res) => {
    try {
        // {}만 입력되어 있으면 모든 형식을 찾는다
        // videos 는 doc의 이름(출력할 object의 이름)
        // await를 find 앞에 적으면 fin는 callback을 필요하지 않다고 인식
        // await는 DB를 기다려줌(무조건 위에서 아래 순서로 출력)
        const videos = await Video.find({});
        res.render("home", { pageTitle: "Home", videos });
    } catch {
        return res.render("server-error");
    }
}

export const watch = (req, res) => {
    //const id = req.params.id;
    const { id } = req.params;
    res.render("watch", { pageTitle : `Watching` });
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Editing` });
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    //POST 형식으로 보낸 form의 value
    const { title } = req.body;

    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    // await 는 명령이 끝나기 전까지 밑의 줄을 실행하지 않음
    // (promise)
    await video.create({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map(word => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        },
    });
    return res.redirect("/");
};