import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.concurrent.TimeUnit;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Main {

    static final String link = "https://acsapps.wku.edu/pls/prod/wkup_tar_trans_display.wkup_tar_trans_get_sbgi";
    static final String plink = "https://acsapps.wku.edu/pls/prod/wkup_tar_trans_display.wkup_tar_trans_post_data";

    static JSONObject json2 = new JSONObject();
    static JSONArray courses = new JSONArray();

    public static void main(String[] args) {

        getSchools(); // gets a list of all the schools
        // Current getClasses gets all the courses for that specific school
        // however depending on implementation it could be changed to display certain categories only.


        try {
            File file = new File("api/courses.json");
            file.createNewFile();
            FileWriter fileWriter = new FileWriter(file);

            fileWriter.write(json2.toJSONString());
            fileWriter.flush();
            fileWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void getSchools() {


        try {

            File file = new File("api/colleges.json");
            file.createNewFile();
            FileWriter fileWriter = new FileWriter(file);


            Document doc;
            // connects to transfer website
            doc = Jsoup.connect(link).get();
            Elements schools = doc.select("option[value]"); // pulls data based on the option tag

            JSONObject json = new JSONObject();
            JSONArray colleges = new JSONArray();
            for (Element element : schools) { // loops through the elements in schools
                int id = Integer.parseInt(element.attr("value")); // uses 'value' to get the unique ID to associate with each link
                String col = element.text(); // gets the school name and location
                String[] splitData = col.split("---"); // splits that information into an array to seperate it.


                JSONObject collegeDetails = new JSONObject();
                getClasses(element.attr("value"));

                collegeDetails.put("id", id);
                collegeDetails.put("title", splitData[0]);
                collegeDetails.put("location", splitData[1]);
                colleges.add(collegeDetails);
                json.put("colleges", colleges);

            }

            fileWriter.write(json.toJSONString());
            fileWriter.flush();
            fileWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void getClasses(String schoolID) {

        int dataPos = 0; //used when scraping to know what is what from the table
        int cid = 0;
        try {
            Document doc;
            doc = Jsoup.connect(plink)
                    .data("p_sbgi_code", schoolID) // plugs the school ID
                    .data("p_subj_code", "All Courses") // Selects to display all courses
                    .data("p_sort_gen_cat", "N")
                    .data("p_sort_COL_cat", "N")
                    .post();

            Elements classes = doc.select("tr");


            for (Element element : classes) {

                // Is used to aid in seperating the data for use in a database.
                // If desire is to just print data as it appears
                // than this is not needed.
                Elements classesD = element.select("td");

                JSONObject courseDetails = new JSONObject();

                for (Element elementD : classesD) {

                    if (dataPos == 0) {
                        courseDetails.put("id", cid);
                        courseDetails.put("collegeID", schoolID);
                        courseDetails.put("course", elementD.text());
                        cid++;
                    } else if (dataPos == 1)
                        courseDetails.put("title", elementD.text());
                    else if (dataPos == 2)
                        courseDetails.put("hrs", elementD.text());
                    else if (dataPos == 3)
                        courseDetails.put("wkucourse", elementD.text());
                    else if (dataPos == 4)
                        courseDetails.put("wkutitle", elementD.text());
                    else if (dataPos == 5)
                        courseDetails.put("wkuhrs", elementD.text());

                    dataPos++;
                    if (dataPos == 9)
                        dataPos = 0;
                    //System.out.println("I: " + elementD.text());
                }
                courses.add(courseDetails);

            }
            json2.put("courses", courses);

        }
        catch (IOException e) {
            e.printStackTrace();
            System.out.println("ID: " + schoolID);
            try {
                TimeUnit.SECONDS.sleep(61);
            } catch (InterruptedException a) {
                e.printStackTrace();
            }
            getClasses(schoolID);
        }
    }
}
