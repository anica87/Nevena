/**
 * Created by anicam on 24/12/2015.
 */
angular.module('angularCordovaApp')
  .directive("dExpandCollapse", function(){

    return {
      restrict: 'EA',
      link: function(scope, element, attrs){

        $(element).click( function() {
          //var show = "false";
          $(element).find(".answer").slideToggle('200',function() {
            // You may toggle + - icon
            $(element).find("span").toggleClass('faqPlus faqMinus');
          });


          if($("div.answer:visible").length>1) {
            // You may toggle + - icon           		    //$(this).parent().find("span.faqMinus").removeClass('faqMinus').addClass('faqPlus');
            $(this).siblings().find(".answer").slideUp('slow');
          }


        });

      }
    }

  });
