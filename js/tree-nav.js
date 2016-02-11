var xml_html = "";

$(function () {

    LoadDir();

    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Open this folder');
    $('.tree li:not(ul) li:not(.parent_li)').each(function() {
    		var folder = $(this).children().children(); // get the <i> and change the icon to open folder for empty folders
        if (folder.hasClass('fa-folder-o')) {
        	folder.removeClass('fa fa-folder-o fa-lg');
          folder.addClass('fa fa-folder-open-o fa-lg');
        }
    });

    $('.tree li.parent_li > span').on('click', function (e) {
    		var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).children().first().removeClass('fa fa-folder-open-o fa-lg').addClass('fa fa-folder-o fa-lg');
        } else {
            children.show('fast');
            $(this).children().first().removeClass('fa fa-folder-o fa-lg').addClass('fa fa-folder-open-o fa-lg');
        }
        e.stopPropagation();
    });
});

function printArray(arr){
    for(var i = 0; i < arr.length; i++){
        if(arr[i].children instanceof Array){
          console.log(arr[i]);
            printArray(arr[i].children);

        }else{
            console.log(arr[i]);
        }
    }
}

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "./online_help.json",
    dataType: "text",
    success: function(json) {
        var t = $.parseJSON(json);
        var arr = $.map(t, function(el){ return el; });
        console.log(arr);
        var obj = arr[0];

        printArray(obj.children);
      },

    error: function(jqXHR, exception) {
          if (jqXHR.status === 0) {
              alert('Not connect.\n Verify Network.');
          } else if (jqXHR.status == 404) {
              alert('Requested page not found. [404]');
          } else if (jqXHR.status == 500) {
              alert('Internal Server Error [500].');
          } else if (exception === 'parsererror') {
              alert('Requested JSON parse failed.');
          } else if (exception === 'timeout') {
              alert('Time out error.');
          } else if (exception === 'abort') {
              alert('Ajax request aborted.');
          } else {
              alert('Uncaught Error.\n' + jqXHR.responseText);
          }
      }
  });
});


function LoadDir() {
	var html = `
  		<li>
      <span><i class="fa fa-folder-o fa-lg"></i><label>Root Folder</label></span>
      <ul>
        <li>
          <span><i class="fa fa-folder-o fa-lg"></i></span> <a href="">Sub Folder</a>
          <ul>
            <li>
              <span><i class="fa fa-file-text-o fa-lg"></i></span> <a href="">File.txt</a>
            </li>
          </ul>
        </li>
        <li>
          <span><i class="fa fa-folder-o fa-lg"></i></span> <a href="">Sub Folder</a>
          <ul>
            <li>
              <span><i class="fa fa-file-text-o fa-lg"></i></span> <a href="">File.txt</a>
            </li>
            <li>
              <span><i class="fa fa-folder-open-o fa-lg"></i></span> <a href="">Sub Sub Folder</a>
            </li>
            <li>
              <span><i class="fa fa-folder-o fa-lg"></i></span> <a href="">Sub Sub Folder</a>
              <ul>
                <li>
                  <span><i class="fa fa-folder-o fa-lg"></i></span> <a href="">Sub Sub Sub Folder</a>
                  <ul>
                    <li>
                      <span><i class="fa fa-file-text-o fa-lg"></i></span> <a href="">File.txt</a>
                    </li>
                    <li>
                      <span><i class="fa fa-file-text-o fa-lg"></i></span> <a href="">File.txt</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span><i class="fa fa-file-text-o fa-lg"></i></span> <a href="">File.txt</a>
                </li>
                <li>
                  <span><i class="fa fa-file-text-o fa-lg"></i></span> <a href="">File.txt</a>
                </li>
              </ul>
            </li>
            <li>
              <span><i class="fa fa-file-text-o fa-lg"></i></span> <a href="">File.txt</a>
            </li>
          </ul>
        </li>
      </ul>
    </li>`;

    $('.tree > ul').html(html);
}
