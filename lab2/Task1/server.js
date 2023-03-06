//import the module
var myMod = require("./module")

let myticket = myMod.myTicket;

let user1 = new myticket;
user1.AddTicket(1,1, 100, "Alex", "Italy", "12-9-2023");
user1.AddTicket(1,2, 200, "Alex", "Germany", "12-3-2024");
user1.DisplayAllTickets();
user1.GetSpecificTicket(1);
user1.updateTicket(1).ArrivalAirport = "Emarat";
user1.GetSpecificTicket(1);
user1.DisplayAllTickets(1);

let user2 = new myticket;
user2.AddTicket(2,1, 104, "Cairo", "Dubai", "12-6-2023");
user2.AddTicket(2,2, 220, "Alex", "Germany", "12-3-2023");
user2.DisplayAllTickets();
user2.GetSpecificTicket(2);
user2.updateTicket(2).ArrivalAirport = "Emarat";
user2.GetSpecificTicket(2);
user2.DisplayAllTickets();