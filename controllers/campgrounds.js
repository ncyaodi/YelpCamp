const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    // if (!req.body) console.log('no body')
    // console.log(req.body)
    res.render('campgrounds/index', { campgrounds })
};


module.exports.renderNewForm = async (req, res) => {
    // console.log('I am here in new campground page')
    res.render('campgrounds/new');
};


module.exports.createNewCampground = async (req, res, next) => {

    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, imgName: f.filename }));  //with Multer package, we have access to req.file. 
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
};


module.exports.renderCampground = async (req, res,) => {

    req.session.returnTo = req.originalUrl;
    const campground = await (await Campground.findById(req.params.id).populate('reviews').populate('author'));

    if (!campground) {

        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    // console.log(campground)
    res.render('campgrounds/show', { campground });
};


module.exports.renderCampgroundEdit = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
};

module.exports.editCampground = async (req, res, next) => {

    const { id } = req.params;
    // console.log('I am in editCamp')


    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    console.log(req.files);
    const imgs = req.files.map(f => ({ url: f.path, imgName: f.filename }));
    campground.images.unshift(...imgs);  //with Multer package, we have access to req.file. 
    await campground.save();
    // console.log(req.body);
    // console.log('You are here');
    req.flash('success', 'Successfully updated the campground!')

    res.redirect(`/campgrounds/${campground._id}`)
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(req.params.id);
    await Campground.findByIdAndDelete(id); //will trigger Findoneanddelete mongoose middleware
    // console.log('You Are Deleting')
    req.flash('success', `Successfully deleted the ${campground.title} campground!`)
    res.redirect('/campgrounds');
};