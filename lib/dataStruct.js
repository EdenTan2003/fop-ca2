// Name : Tan Yong Kit, Eden
// Class: DIT/1A/04
// Adm  : 2243605

var input = require('readline-sync');

//---------------------------//
//----------CLASSES----------//
//---------------------------//

// Create Member Class
class Member {
    // Member constructor with default membership ruby and points earned value is 0
    constructor(name, membershipType = "Ruby", dateJoined, dob, pointsEarned = 0) {
        this.name = name;
        this.membershipType = membershipType;
        this.dateJoined = dateJoined;
        this.dob = dob;
        this.pointsEarned = pointsEarned;
    }
    // Retrieve Current Date In CA2 Date Format using Date Function
    getCurrDate() {
        var date = new Date();

        var day = date.getDate();
        var month = date.getMonth();
        // Array to store all the months for retrieving
        var arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        month = arr[month];
        
        var year = date.getFullYear();
        // Convert Date Format To Required CA2 Format
        var final_date = day + " " + month + " " + year;

        return final_date;
    }  
}

// Declare var member to hold class Member()
var member = new Member();

// Create MemberGroup Class
class MemberGroup {
    constructor() {
        // Array to hold all members' data
        this.memberList = [
            new Member("Leonardo", "Gold", "1 Dec 2019", "1 Jan 1980", 1400),
            new Member("Catherine", "Ruby", "14 Jan 2020", "28 Oct 1985", 250),
            new Member("Luther", "Gold", "29 Apr 2020", "16 Mar 1992", 3350),
            new Member("Bruce", "Diamond", "3 Jun 2020", "18 Mar 1994", 40200),
            new Member("Amy", "Gold", "5 Jun 2020", "31 May 2000", 500)
        ];
    }
    //---------------------------//
    //-----MAIN MENU METHODS-----//
    //---------------------------//

    //Display All Members' Info
    displayAllMemberInfo() {
        for (var i = 0; i < this.memberList.length; i++) {
            this.get_member(i);
        }
    }
    //Display Specific Member Info
    displayMemberInfo() {
        var name_search = input.question("Please enter member's name: ");
        // Check if name exists in member list array
        var found = this.check_list(name_search)[0]; // Retrieve boolean value (true or false) if name is found or not
        var i = this.check_list(name_search)[1]; // Retrieve index of found name if name is found

        if (found) {
            this.get_member(i);
        }
        else {
            console.log("Member does not exist.");
        }
    }
    // Add New Member 
    addNewMember() {
        do {
            do {
                var new_name = input.question("Please enter member's name: ");
                // Name Validation
                if (!valid_name(new_name)) {
                    console.log("Name can only contain letters with/without space or special characters (, - ').\n");
                }
            } while (!valid_name(new_name));

            // Check if name exists in member list array
            var found = this.check_list(new_name)[0]; // Retrieve boolean value (true or false) if name is found or not

            if(found) {
                console.log("\nMember\'s name exists in database. Please enter a new name.");
            }
        } while (found == true);

        // Date Validation - Advanced Feature
        do {
            var new_dob = input.question("Please enter member's date of birth: ");
            // Get string date and convert it to date format
            var check_date = new Date(new_dob);
            var lowest_date = new Date("1 Jan 1800"); // Make sure that user doesn't key in year that is before 1800
            var today_date = new Date(member.getCurrDate()); // Get current date 
            if (!valid_date(new_dob) || (check_date >= today_date) || (check_date < lowest_date)) {
                console.log("\nInvalid Date/Format, Enter Valid Date E.g 1 January 2020 or 23 Feb 2012."); //Display alert if user keyed in a invalid date/format
            }
        } while (!valid_date(new_dob) || (check_date > today_date) || (check_date < lowest_date));
        // If input month is in full spelling it will change month in full spelling to short form
        var day_dob = check_date.getDate();
        var month_dob = check_date.getMonth();
        var year_dob = check_date.getFullYear();
        var month_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        new_dob = day_dob + " " + month_arr[month_dob] + " " + year_dob;

        // If user keyed in valid name and date of birth, new member data will be added into member list
        this.memberList.push(new Member(new_name, this.membershipType, member.getCurrDate(), new_dob, this.pointsEarned)); 
    }
    // Remove Existing Member - ADVANCED FEATURE
    removeMember() {
        var rmv_name = input.question("Please enter member's name: ");
        // Check if name exists in member list array
        var found = this.check_list(rmv_name)[0]; // Retrieve boolean value (true or false) if name is found or not
        var i = this.check_list(rmv_name)[1]; // Retrieve index of found name if name is found

        if (found) {
            var confirmation = input.question("Proceed - [Y/N]?"); // Ask user for confirmation to delete specific member from member list

            if (confirmation.toLowerCase() == "y") {
                rmv_name = this.memberList[i].name
                this.memberList.splice(i, 1); // External Function Used
                
                console.log(`\nMember - ${rmv_name}, has been removed from the database.`)
            }
            else {
                console.log("\nRequest Cancelled.")
            }
        }
        else {
            console.log("Member does not exist.")
        }
    }
    // Update Points To Members
    updatePoints() {
        var name_search = input.question("Please enter member's name: ");
        // Check if name exists in member list array
        var found = this.check_list(name_search)[0]; // Retrieve boolean value (true or false) if name is found or not
        var i = this.check_list(name_search)[1]; // Retrieve index of found name if name is found

        if (found) {
            do {
                var amount_spent = input.question("Please enter amount spent: ");
                if (isNaN(amount_spent) || amount_spent <= 0) {
                    console.log("Please enter a valid amount, amount must be more than 0.\n") // Display alert if amount is not a number or less than or equal to 0
                }
            } while (isNaN(amount_spent) || amount_spent <= 0);

            var amount_spent = parseFloat(amount_spent);
            var points_earned;
            // Check amount spent to know how much points earned
            if (amount_spent <= 50) {
                points_earned = 10;
            }
            else if (amount_spent <= 100) {
                points_earned = 50;
            }
            else if (amount_spent <= 200) {
                points_earned = 100;
            }
            else if (amount_spent <= 500) {
                points_earned = 200;
            }
            else if (amount_spent <= 1000) {
                points_earned = 500;
            }
            else if (amount_spent <= 2500) {
                points_earned = 1000;
            }
            else {
                points_earned = 2000;
            }
            // Add points earned to specific members' points
            this.memberList[i].pointsEarned += points_earned;

            // Check specific members' points to see if change of membership type is needed.
            if (this.memberList[i].pointsEarned < 500) {
                this.memberList[i].membershipType = "Ruby";
            }
            else if (this.memberList[i].pointsEarned < 5000) {
                this.memberList[i].membershipType = "Gold";
            }
            else if (this.memberList[i].pointsEarned < 20000) {
                this.memberList[i].membershipType = "Platinum";
            }
            else {
                this.memberList[i].membershipType = "Diamond";
            }
        }
        else {
            console.log("Member does not exist.");
        }
    }

    //----------------------------//
    //------SUB-MENU METHODS------//
    //----------------------------//

    // Display Members With Same Membership Type
    displaySameTypeMemberNames() {
        do {
            var valid = false;
            var type_search = input.question("\t\tEnter Membership Type: ");
            // Check if user keyed in a valid membership type
            if (type_search.toLowerCase() == "ruby" || type_search.toLowerCase() == "gold" || type_search.toLowerCase() == "platinum" || type_search.toLowerCase() == "diamond") {
                valid = true;
            }
            else {
                console.log("\t\tPlease enter a valid membership type.\n");
            }
        } while (valid == false);

        var name_str = ""; // Store all members with same membership type into string array
        for (var i = 0; i < this.memberList.length; i++) {
            if (type_search.toLowerCase() == this.memberList[i].membershipType.toLowerCase()) {
                name_str += this.memberList[i].name + ", ";
            }
        }
        console.log(`\t\tMember(s) of membership type ${type_search.toLowerCase()}: ${name_str}\b\b.\n`);
    }
    // Display Youngest and Oldest Member
    displayYoungOldMember() {
        // Find Youngest
        var youngest = new Date(this.memberList[0].dob);
        var name_youngest = []; // Used to store youngest member name
        name_youngest[0] = this.memberList[0].name;
        for (var i = 1; i < this.memberList.length; i++) {
            var curr_date = new Date(this.memberList[i].dob)
            if (curr_date > youngest) {
                // Replace youngest with non-string(date) format
                youngest = new Date(this.memberList[i].dob);
                name_youngest[0] = this.memberList[i].name; // Add youngest member name into name_youngest array
            }
            else if (curr_date >= youngest) {
                name_youngest.push(" " + this.memberList[i].name); // If member is same date as youngest, it will be pushed into name_youngest array
            }
        }

        // Find Oldest
        var oldest = new Date(this.memberList[0].dob);
        var name_oldest = []; // Used to store oldest member name
        name_oldest[0] = this.memberList[0].name;
        for (var i = 1; i < this.memberList.length; i++) {
            var curr_date = new Date(this.memberList[i].dob)
            if (curr_date < oldest) {
                // Replace oldest with non-string(date) format
                oldest = new Date(this.memberList[i].dob);
                name_oldest[0] = this.memberList[i].name; // Add oldest member name into name_oldest array
            }
            else if (curr_date <= oldest) {
                name_oldest.push(" " + this.memberList[i].name) // If member is same date as oldest, it will be pushed into name_oldest array
            }
        }
        console.log(`\t\tYoungest member: ${name_youngest}\n\t\tOldest member: ${name_oldest}\n`);
    }
    // Display Member With Highest and Lowest Points
    displayMemberHighLowPoints() {
        // Find Member with highest points
        var highest = this.memberList[0].pointsEarned;
        var name_highest = []; // Used to store highest point member name
        name_highest[0] = this.memberList[0].name;
        for (var i = 1; i < this.memberList.length; i++) {
            var h = this.memberList[i].pointsEarned;
            if (h > highest) {
                highest = h;
                name_highest[0] = this.memberList[i].name; // Add highest point member name into name_highest array
            }
            else if (h >= highest) {
                name_highest.push(" " + this.memberList[i].name); // If member is same points as highest point member, it will be pushed into name_highest array
            }
        }

        // Find Member With Lowest Points
        var lowest = this.memberList[0].pointsEarned;
        var name_lowest = []; // Used to store lowest point member name
        name_lowest[0] = this.memberList[0].name;
        for (var i = 1; i < this.memberList.length; i++) {
            var l = this.memberList[i].pointsEarned;
            if (l < lowest) {
                lowest = l;
                name_lowest[0] = this.memberList[i].name; // Add lowest point member name into name_lowest array
            }
            else if (l <= lowest) {
                name_lowest.push(" " + this.memberList[i].name) // If member is same points as lowest point member, it will be pushed into name_lowest array
            }
        }
        console.log(`\t\tHighest Member: ${name_highest}\n\t\tLowest Member: ${name_lowest}\n`);
    }
    // Display Total Members In Each Membership Type
    totalMembersInEachType() {
        var mem_type = ["Ruby", "Gold", "Platinum", "Diamond"]; // Array of membership types
        var ruby_count = 0, gold_count = 0, plat_count = 0, diam_count = 0;
        // Count number of members' with same membership type
        for (var i = 0; i < mem_type.length; i++) {
            var count = 0;
            for (var j = 0; j < this.memberList.length; j++) {
                if (mem_type[i].toLowerCase() == this.memberList[j].membershipType.toLowerCase()) {
                    count += 1; // Increase count by 1 if member with same membership type if found
                }
            }
            switch (i) {
                case 0: 
                    ruby_count += count;
                    break;
                case 1:
                    gold_count += count;
                    break;
                case 2: 
                    plat_count += count;
                    break;
                case 3:
                    diam_count += count;
                    break;
            }
        }
        console.log(`\t\tRuby: ${ruby_count}\n\t\tGold: ${gold_count}\n\t\tPlatinum: ${plat_count}\n\t\tDiamond: ${diam_count}\n`);
    }
    // Display Total Points In Each Membership Type
    displayTotalPointInEachType() {
        var mem_type = ["Ruby", "Gold", "Platinum", "Diamond"];
        var ruby_point = 0, gold_point = 0, plat_point = 0, diam_point = 0;

        for (var i = 0; i < mem_type.length; i++) {
            var total_points = 0;
            // Check for members with same membership type
            for (var j = 0; j < this.memberList.length; j++) {
                if (mem_type[i].toLowerCase() == this.memberList[j].membershipType.toLowerCase()) {
                    total_points += this.memberList[j].pointsEarned; // Add member points with same member type together 
                }
            }
            switch (i) {
                case 0: 
                    ruby_point += total_points;
                    break;
                case 1:
                    gold_point += total_points;
                    break;
                case 2: 
                    plat_point += total_points;
                    break;
                case 3:
                    diam_point += total_points;
                    break;
            }
        }
        console.log(`\t\tRuby: ${ruby_point}\n\t\tGold: ${gold_point}\n\t\tPlatinum: ${plat_point}\n\t\tDiamond: ${diam_point}\n`);
    }
    // Check if name exist
    check_list(name) {
        var found = false;
        // For Loop To Check If Name Exist In Member List
        for (var i = 0; i < this.memberList.length; i++) {
            if (name.toLowerCase() == this.memberList[i].name.toLowerCase()) {
                found = true;
                break;
            }
        }
        var arr = [found, i]
        return arr;
    }
    // Display member from member list
    get_member(i) {
        console.log(`\nName: ${this.memberList[i].name}`);
        console.log(`Membership Type: ${this.memberList[i].membershipType}`);
        console.log(`Date Joined: ${this.memberList[i].dateJoined}`);
        console.log(`Date of Birth: ${this.memberList[i].dob}`);
        console.log(`Points Earned: ${this.memberList[i].pointsEarned}`);
    }
}

module.exports = {
    MemberGroup: MemberGroup
}

//----------------------------//
//-----Advanced Features------//
//----------------------------//

//To check if name contain letters, spaces and allowed special characters only
function valid_name(str) {
    return /^[a-zA-Z\s',-]+$/.test(str); // External Function Used
}

// To Check If Date Format Is Correct
function valid_date(date_str) {
    var regex = /^(([0-9])|([1-2][0-9])|([3][0-1]))\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}$/;
    let match = regex.exec(date_str);
    var date_match;

    if (match) {
        date_match = true;
    }
    else {
        date_match = false;
    }
    return date_match;
}
