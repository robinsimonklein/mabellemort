// vue.config.js
module.exports = {
    // options...
    css: {
        loaderOptions: {
            sass: {
                data: `
          @import "@/scss/_main.scss";
        `
            }
        }
    }
};