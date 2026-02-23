/*
    Get 0 column - date and time
    Get 2 column - base point non WGR (wind-powered generation resource) pricing
    Show text for date and time
    draw a bar for base point non WGR pricing

*/

let table;
let camOffset = 0;
async function setup() {
    createCanvas(windowWidth, windowHeight);
    // import table for houston in september 2024.
    table = await loadTable('ERCOT Data/2024_gendata/1036717056.ext.00013056.0000000000000000.20240917.040608.2_Day_Real_Time_Generation_and_Load_Data/2d_Agg_Gen_Summary_Houston-17-SEP-24.csv', ',', 'header');
    console.log(table);
    timeStamp = table.getColumn(0);
    basePointNonWGR = table.getColumn(2);
}

function draw() {
    if (keyIsDown(LEFT_ARROW) && camOffset < 0){
        camOffset += windowWidth/60
    }
    if (keyIsDown(RIGHT_ARROW) ){
        camOffset -= windowWidth/60 
    }
  background(220);
  if (table){
    text("Non wind generated power source base point pricing\nHouston, September 2024",windowWidth/2-textWidth("Non wind generated power source base point pricing\nHouston, September 2024")/2,windowHeight*0.05)
    // pricing lines
    
    
    //line(0,)
    for (let i = 0; i < table.getRowCount(); i++){
        barX = (i+1)*windowWidth*0.05+camOffset;
        //barY = windowHeight-(i*windowHeight*0.5);
        
        rect(barX+windowWidth*-.025,windowHeight-(windowHeight*(basePointNonWGR[i]/15000)),windowWidth*0.05,windowHeight*(basePointNonWGR[i]/15000));
        //text(timeStamp[i], barX, barY);
    }
    for (let t = 0; t < table.getRowCount(); t++){
        textX = (1+t)*windowWidth*0.05+camOffset;
        textY = windowHeight*0.02+((t%20)*windowHeight*0.04);
        
        //rect(textX-windowWidth*-.025,windowHeight-(windowHeight*(basePointNonWGR[i]/15000)),windowWidth*0.05,windowHeight*(basePointNonWGR[i]/15000));
        text(timeStamp[t], textX-textWidth(timeStamp[t])/2, textY);
        stroke('#e2e521')
        line(textX,textY,textX,windowHeight)
        stroke(0)
    }
  }
  for (p = 0; p <= 15000; p += 1000){
    text(p,windowWidth*0.01,windowHeight-(windowHeight*(p/15000)))
    line(0,windowHeight-(windowHeight*(p/15000)),windowWidth,windowHeight-(windowHeight*(p/15000)))
  }

  //noLoop();
}