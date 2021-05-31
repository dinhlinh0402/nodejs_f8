const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { render } = require('node-sass');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next){

        // res.json(res.locals._sort);

        let courseQuery = Course.find({});

        // if (req.query.hasOwnProperty('_sort')) {
        //     // res.json({message: 'Successfully'});
        //     const isValidtype = ['asc', 'desc'].includes(req.query.type);
        //     courseQuery = courseQuery.sort({
        //         [req.query.column]: isValidtype ? req.query.type : 'desc',
        //     });
        // }

        Promise.all([
            Course.find({}).sortable(req), 
            Course.countDocumentsDeleted()]
        )
            .then(([courses, deleteCount]) =>
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next)

        // Course.countDocumentsDeleted()
        //     .then((deleteCount) => {
        //         console.log(deleteCount);
        //     })
        //     .catch(() => {});

        // Course.find({})
        //     .then(courses => {
        //         res.render('me/stored-courses', {
        //             courses: mutipleMongooseToObject(courses)
        //         });

        //     })
        //     .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next)
    }
}

module.exports = new MeController();