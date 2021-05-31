module.exports = function sortMiddleware(req, res, next) {

    res.locals._sort = {
        enabled: false,
        type: 'default'
    };

    if(req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.column;


        // Hợp nhất 2 Object: theo thứ tự từ phải sang trá, Giống cách bên trên
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });

    }

    next();
}