const mongoose = require('mongoose');
// import plugin mongoose slug generator
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number, },
        name: { type: String, required: true }, // required: true: la bat buoc
        description: { type: String, maxLength:600 },
        image: { type: String, maxLength:255 },
        videoId: { type: String, maxLength: 255},
        level: { type: String, maxLength: 255},
        slug: { type: String, slug: 'name', unique: true}, // unique: true Có ý nghĩa là chỉ tồn tại duy nhất 1 cái slug
    }, 
    {
        _id: false,
        timestamps: true, // tu dong update thoi gian them, sua
    }
);
// mongoose slug generator: là 1 plugin cho mongoose hỗ trợ tạo tự dộng 1 slug

// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        // res.json({message: 'Successfully'});
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
}


// Add plugins
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Course',CourseSchema);