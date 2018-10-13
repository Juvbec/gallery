'use strict'

console.log('Starting up');

function initPage() {

renderModal(gProjects)
renderPortfolio(gProjects)

}



function renderModal(projects) {
    console.log('rendering the page');
    
    var HTMLStr = projects.map(function(element) {
    return `
    <div class="portfolio-modal modal fade" id="${element.id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${element.title}</h2>
                <p class="item-intro text-muted">${element.desc}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${element.img}-full.png" alt="">
                <ul class="list-inline">
                  <li>Date: ${element.publishedAt}</li>
                  <li><a href="${element.url}">Go to the project</a></li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
})

$('footer').after(HTMLStr.join(''));

}

function renderPortfolio(projects) {
    var HTMLStr = projects.map(function(element){
     return `
    <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#${element.id}">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${element.img}.png" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${element.title}</h4>
            <--<p class="text-muted"></p>-->
          </div>
        </div>
        `
    })
    $('#dynamicPortfolio').html(HTMLStr.join(''))
}