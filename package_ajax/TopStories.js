 /* <![CDATA[ */
        var newsRequest = false;
        var headlines = new Array();
        var headlinesString = "";
        function getRequestObject() {
            try {
                httpRequest = new XMLHttpRequest();
            }
            catch (requestError) {
                try {
                    httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (requestError) {
                    try {
                        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch (requestError) {
                        window.alert("Your browser does not support AJAX!");
                        return false;
                    }
                }
            }
            return httpRequest;
        }
        var recentNews;



        function newsUpdate() {
            if (!newsRequest)
                newsRequest = getRequestObject();
            for (var i = 0; i < 6; ++i) {
                if (document.forms[0].agency[i].checked == true) {
                    var agency = document.forms[0].agency[i].value;
                    break;
                }
            }
            newsRequest.abort();
            newsRequest.open("get", "TopStories.php?" + "agency=" + agency, true);
            newsRequest.send(null);
            newsRequest.onreadystatechange = fillNewsInfo;
            clearTimeout(recentNews);
            recentNews = setTimeout('newsUpdate()', 300000);
        }
        function fillNewsInfo() {
            if (newsRequest.readyState == 4 && newsRequest.status == 200) {
                var news = newsRequest.responseXML;
                document.getElementById("newsCell").innerHTML = ""
                var newsItems = news.getElementsByTagName("item");
                headlines.splice(0);
                if (newsItems.length > 0) {
                    for (var i = 0; i < newsItems.length; ++i) {
                        var curHeadline = newsItems[i].getElementsByTagName("title")[0].firstChild.nodeValue;
                        headlines[headlines.length] = curHeadline;
                        var curLink = newsItems[i].getElementsByTagName("link")[0].firstChild.nodeValue;
                        var curPubDate = newsItems[i].getElementsByTagName("pubDate")[0].firstChild.nodeValue;
                        var curDesc = newsItems[i].getElementsByTagName("description")[0].firstChild.nodeValue;
                        var curStory = "<a href='" + curLink + "'>" + curHeadline + "</a><br />";
                        curStory += "<span style='color: gray'>" + curPubDate + "</span><br />";
                        curStory += curDesc + "<br />";
                        document.getElementById("newsCell").innerHTML += curStory;
                    }
                }
                else
                    document.getElementById("newsCell").innerHTML = "RSS feed does not contain any items.";
                headlinesString = headlines.join(" ... ");
                document.forms[0].headlines.value = headlinesString;
                scrollHeadlines();
            }
        }
        var changeHeadlines;
        function scrollHeadlines() {
            var curHeadline = document.forms[0].headlines.value;
            document.forms[0].headlines.value = curHeadline.substring(1) + curHeadline.substring(0, 1);
            clearTimeout(changeHeadlines);
            changeHeadlines = setTimeout('scrollHeadlines()', 100);
        }

function PopulateValues()
{
    var ar = new Array();
    ar [ 0 ] = "http://my.abcnews.go.com/rsspublic/fp_rss20.xml"
    ar [ 1 ] = "http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/front_page/rss.xml"
    ar [ 2 ] = "http://www.cbsnews.com/feeds/rss/main.rss"
    ar [ 3 ] = "http://rss.cnn.com/rss/cnn_topstories.rss"
    ar [ 4 ] = "http://rss.msnbc.msn.com/id/3032091/device/rss/rss.xml"
    ar [ 5 ] = "http://rss.news.yahoo.com/rss/topstories"
}

        /* ]]> */