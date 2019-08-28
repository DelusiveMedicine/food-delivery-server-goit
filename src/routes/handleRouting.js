const checkId = url => {
    const lastIndex = url.lastIndexOf('/');
    const idString = url.slice(lastIndex +1).trim();
    if (isNaN(idString)) {
        return url;
      }

    if (idString && lastIndex) {
        return url.slice(0, lastIndex);
      }
      return url;
}


const handleRouting = (router, url) => {
        const clearUrl = checkId(url);
        return router[clearUrl];
      };

module.exports = handleRouting;