//WARNING
//현재 이 파일을 토대로 CORS 오류를 수정하려 했지만 적용되지 않는 문제가 발생
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(
//         '/recommend_place', '/api/searchPlace',
//         createProxyMiddleware({
//             target: 'http://localhost:8080',
//             changeOrigin: true,
//         })
//     );
// };