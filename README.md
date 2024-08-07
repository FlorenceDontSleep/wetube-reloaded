


/ -> Home
/join -> Join
/login -> Login
/search -> Search

/users/:id -> See User
/users/logout -> Log Out
/user/edit -> Edit My Profile
/user/delete -> Delete My Profile

/videos/:id -> See Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video


현재 로그인 시 에 메인화면을 가는데 로그인하지 않는 화면을 보여주는 문제가 있음. 수정필요
회원 가입 시에도 최초에 user 이름이 보이지 않음

--

req.body    -> HTTP 요청의 본문(body) 데이터. 
               주로 POST, PUT, PATCH 요청에서 데이터를 전송할 때 사용됨
               사용자가 폼을 제출할 때 그 폼의 데이터가 req.body에 포함되서 전달됨
               보통 HTTP 요청에 저장되어 있음

req.session -> 세션의 데이터 관리
               통상적으로 사용자의 로그인 상태, 사용자 설정, 사용자 정보 등을 저장함
               보통 DB에 저장되어 있음