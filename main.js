// Name : Tan Yong Kit, Eden
// Class: DIT/1A/04
// Adm  : 2243605

/*  
    Advanced Features Description:
    -   Requires Admin Password To Access Database.
    -   Name Validation (Only Accept Letters And Certain Special Characters) - For Welcome Name and Add New Member Name.
    -   Add New Member Date Validation (Only Format and Date Limit).
    -   Remove Existing Member From Database.
    -   Able to display multiple members that are the oldest and youngest in database.
    -   Ablt to display multiple members with the highest and lowest Points. 

    Brief Description (Main-Menu):
    User must login using Admin Password to access Database. After successful login, user will be greeted 
    and will be asked to input his/her name (with validation). Then, they will be prompted to choose 6 
    different options apart from option 7 which is to exit the database. Options in the main-menu include:
    1. Display All Member Info
    2. Display Specific Member Info
    3. Add New Member
    4. Remove Existing Member
    5. Update Points
    6. Statistics Of All Members.

    Brief Description (Sub-Menu):
    User will be brought to the Sub-Menu after selecting option 6 in the Main-Menu. In the Sub-Menu, user will be prompted
    with 5 different options to choose from apart from option 6 which is to exit the Sub-Menu. Options in the Sub-Menu include:
    1. Display names of Members in same Membership Type.
    2. Display Youngest and Oldest Member.
    3. Display Member with Highest and Lowest Points.
    4. Display Total Members in each Membership Type.
    5. Display Total Points in each Membership Type.
*/


var name;
var input = require('readline-sync');

// Import file admin.js and dataStruct.js
const Admin_Password = require("./lib/admin");
var dataStruct = require("./lib/dataStruct");

var members = new dataStruct.MemberGroup();

// Display Choices (Main-Menu)
function displayMenu() {
    do {
        var user_choice_main = input.question("\nHi " + name + ", please select your choice:\n\t1. Display all members\' information\n\t2. Display member information\n\t3. Add new member\n\t4. Remove existing member\n\t5. Update points earned\n\t6. Statistics\n\t7. Exit\n\t>> ");

        switch (user_choice_main) {
            case "1":
                members.displayAllMemberInfo(); // Displays all members info in the members' list
                break;
            case "2":
                members.displayMemberInfo(); // Displays specific member info
                break;
            case "3":
                members.addNewMember(); // Add new member to member list
                break;
            case "4":
                members.removeMember(); // Remove existing member from member list
                break;
            case "5":
                members.updatePoints(); // Update points after keying in amount spent by member
                break;
            case "6":
                displayStatistics(); // Displays Sub-Menu
                break;
            case "7":
                console.log("Thank you & goodbye!"); // Prompt after user selected option to exit
                break;
            default:
                console.log("Please enter a valid input.\n"); // Display alert when user keyed in a invalid option
                break;
        }
    } while (user_choice_main != 7); // User will exit database only if option 7 is chosen.
}


// Display Statistics Menu (Sub-Menu)
function displayStatistics() {
    do {
        var user_choice_sub = input.question("\t\tPlease select an option from the sub-menu:\n\t\t1. Display names of (all) a certain type of members only.\n\t\t2. Display the name of the youngest and oldest member in the system.\n\t\t3. Display the name of members with the highest and lowest points earned.\n\t\t4. Display total number of members in each membership type.\n\t\t5. Display the total points in each membership type.\n\t\t6. Return to main-menu\n\t\t>> ");

        switch (user_choice_sub) {
            case "1":
                members.displaySameTypeMemberNames(); // Display members with same membership type
                break;
            case "2":
                members.displayYoungOldMember(); // Display youngest and oldest member
                break;
            case "3":
                members.displayMemberHighLowPoints(); // Display member with highest and lowest points
                break;
            case "4":
                members.totalMembersInEachType(); // Display total members in each membership type
                break;
            case "5":
                members.displayTotalPointInEachType(); // Display total points in each membership type
                break;
            case "6":
                break;
            default:
                console.log("\t\tPlease enter a valid input.\n"); // Display alert when user keyed in a invalid option
                break;
        }
    } while (user_choice_sub != 6); // User will exit Sub-Menu only if option 7 is chosen.
}

//----------------------------//
//-----Advanced Features------//
//----------------------------//

//To check if name contain letters, spaces and allowed special characters only
function valid_name(str) {
    return /^[a-zA-Z\s',-]+$/.test(str);
}

// To Add A Layer Of Security When Accessing Database
function admin_verification() {
    do {
        // Prompt User to key in Admin Password before gaining access to the database.
        var password = input.question("Welcome to XYZ Membership Loyalty Programme Database,\nPlease enter Admin Password to continue.\n>> ");
        if (password == Admin_Password) {
            // After keying in correct password, user will be welcomed to the database
            console.log("\nWelcome to XYZ Membership Loyalty Programme!");

            //Name Validation: Check if name contains only letters and certain special characters
            do {
                name = input.question("Please enter your name: ");

                if (!valid_name(name)) {
                    console.log("Name can only contain letters with/without space or special characters (, - ').\n");
                }
            } while (!valid_name(name));
            // Display Menu after user has given valid name
            displayMenu();
        }
        else {
            console.log("Password is incorrect, Please Try Again.\n");
        }
    } while (password != Admin_Password);
}

//-----------------------------------------------//
//-----Invoke Function admin_verification()------//
//-----------------------------------------------//
admin_verification();