
// Recursive Method to Navigate through the JSON Object and append html list
// items to create the directory tree.
function MapJsonToTree(arr){
  var html = "";
    for(var i = 0; i < arr.length; i++){
        if(arr[i].children instanceof Array && arr[i].isFolder){
          if (arr[i].children.length > 0)
          {
              html += '<li><span><label><i class="fa fa-folder-o fa-lg"></i>' + arr[i].title + '</label></span><ul>';
          } else {
            html += '<li><span><label><i class="fa fa-folder-open-o fa-lg"></i>' + arr[i].title + '</label></span> <ul>';
          }

          html += MapJsonToTree(arr[i].children);
          html += '</ul></li>';

        }else{
          var extention = arr[i].title.substring(arr[i].title.lastIndexOf('.'), arr[i].title.length);
          switch (extention) {
            case '.cs':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.css':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.scss':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.less':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.aspx':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.asmx':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.disco':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.discomap':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.wsdl':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.master':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.webinfo':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.config':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.publishproj':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.js':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.json':
              html += '<li><span><label><i class="fa fa-file-code-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.png':
              html += '<li><span><label><i class="fa fa-file-image-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.jpg':
              html += '<li><span><label><i class="fa fa-file-image-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.jpeg':
              html += '<li><span><label><i class="fa fa-file-image-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.psd':
              html += '<li><span><label><i class="fa fa-file-image-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.ico':
              html += '<li><span><label><i class="fa fa-file-image-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.zip':
              html += '<li><span><label><i class="fa fa-file-zip-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.rar':
              html += '<li><span><label><i class="fa fa-file-zip-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.7zip':
              html += '<li><span><label><i class="fa fa-file-zip-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            case '.accdb':
              html += '<li><span><label><i class="fa fa-database fa-lg"></i>' + arr[i].title + '</label></span></li>';
              break;
            default:
              html += '<li><span><label><i class="fa fa-file-text-o fa-lg"></i>' + arr[i].title + '</label></span></li>';
          }
        }
    }
    return html;
}

function setTreeFunctionality() {
  $('.tree li:has(ul)').addClass('parent_li').find(' > span');
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
          $(this).children().children().first().removeClass('fa fa-folder-open-o fa-lg').addClass('fa fa-folder-o fa-lg');
          $(this).attr('title', 'Open this folder');
      } else {
          children.show('fast');
          $(this).children().children().first().removeClass('fa fa-folder-o fa-lg').addClass('fa fa-folder-open-o fa-lg');
          $(this).attr('title', 'Close this folder');
      }
      e.stopPropagation();
  });
}

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "./vs_2013_mapped.json",
    dataType: "text",
    success: function(json) {
        var t = $.parseJSON(json);
        var arr = $.map(t, function(el){ return el; });
        console.log(arr);
        var obj = arr[0];

        $('.tree ul').html(MapJsonToTree(obj.children));

        setTreeFunctionality();
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
