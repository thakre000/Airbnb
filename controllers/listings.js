const Listing = require("../models/listing");


module.exports.index = async (req, res) =>{const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}

module.exports.renderNewForm = async (req, res) => {

   
    res.render("listings/new.ejs");
  }


 module.exports.showNewForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
path: "reviews",
populate :{
  path: "author",
}

    }).populate("owner");
    if(!listing){

   req.flash("error", "Listing yuo requested does not exit")
   res.redirect("/listing");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  }

  module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    
    newListing.owner = req.user._id;
    
    await newListing.save();
    req.flash ("success", "new listing created")
    res.redirect("/listings");
  }

module.exports.renderEditForm = 
      async (req, res) => {
      let { id } = req.params
      const listing = await Listing.findById(id);
      res.render("listings/edit.ejs", {listing})
    }

    module.exports.deleteForm =  async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash ("success", "new listing deteted")
        res.redirect("/listings");
      }