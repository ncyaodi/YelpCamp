const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    review.authorName = req.user.username;
    campground.reviews.unshift(review);
    //use unshift to add new comments at beginning of the array, so that the reviews will be shown in added sequence
    await campground.save();
    await review.save();
    req.flash('success', 'Thank you for submitting your review!')
    res.redirect(`/campgrounds/${campground._id}`)

};


module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }) //delete related reviewID from array. 
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your review has been deleted!')
    res.redirect(`/campgrounds/${id}`)
};

