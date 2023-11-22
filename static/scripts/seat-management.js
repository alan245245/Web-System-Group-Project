function drawSeats(row, col, occupiedSeats = "", firstClass = "") {
    let seatNumber = 1;
    let heightSVG = 250;
    let widthSVG = 250;
    let startX = 0,
        startY = 0;
    const gapX = widthSVG / (col + 1);
    const gapY = heightSVG / row;
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.getElementById("seat-map");

    for (i = 0; i < row; i++) {
        // Will sweep through X-axis
        for (y = 0; y < col; y++) {
            // Will sweep through Y-axis
            let seat = document.createElementNS(ns, "rect");
            seat.setAttribute("x", startX);
            seat.setAttribute("y", startY);
            seat.setAttribute("width", 50);
            seat.setAttribute("height", 50);
            seat.setAttribute("id", seatNumber);
            if (occupiedSeats.includes(seatNumber)) {
                seat.setAttribute("class", "booked-seat");
            } else {
                seat.setAttribute("class", "available-seat");
            }
            svg.appendChild(seat);

            let text = document.createElementNS(ns, "text");
            text.setAttribute("style", "fill: white;display:block");
            text.setAttribute("x", startX + gapX / 2);
            text.setAttribute("y", startY + gapY / 2);
            text.setAttribute("fill", "white");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("alignment-baseline", "central");
            text.setAttribute("class", "seat-number");
            text.textContent = seatNumber;
            text.style = "textAnchor: middle;alignmentBaseline: central";
            svg.appendChild(text);
            seatNumber++;
            startX += gapX;
            if (startX == (col / 2) * gapX) {
                startX += gapX;
            }
        }
        startX = 0;
        startY += gapY;
    }
}
