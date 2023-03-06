class myTicket{
    Tickets=[];
    AddTicket(id,seatNum, flightNum, DepartureAirport, ArrivalAirport, date){
        let ticket = {id, seatNum, flightNum, DepartureAirport, ArrivalAirport, date};
        this.Tickets.push(ticket);
    }
    DisplayAllTickets(){
        console.log("All reserved Tickets for you are:")
        for(let i=0; i<this.Tickets.length; i++){
            console.log(this.Tickets[i]);
        }
    }
    GetSpecificTicket(id){
        for(let i=0; i<this.Tickets.length; i++){
            if(this.Tickets[i].id === id){
                console.log("The related ticket of " +`${id}`+" id:")
                console.log(this.Tickets[i])
            }
        }   
    }
    updateTicket(id){
        //looping for finding index
        var ticketIndex = this.Tickets.findIndex((elem) => elem.id === id);
        console.log("Ticket Before Updating: ");
        console.log(this.Tickets[ticketIndex])
        console.log("Ticket After Updating: ");
        return this.Tickets[ticketIndex]
    }
}

//export this module
module.exports = {
    myTicket
}