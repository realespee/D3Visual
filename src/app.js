
var canvas = d3.select('#network').attr('width', 960).attr('height', 600)
var width = canvas.attr('width'),
    height = canvas.attr('height'),
    r=3,
    ctx = canvas.node().getContext('2d'),
    simulation = d3.forceSimulation()
        .force('x', d3.forceX(width/2))
        .force('y', d3.forceY(height/2))
        .force('collide', d3.forceCollide(r+2))
        .force('charge', d3.forceManyBody()
            .strength(-20))

Promise.all([
        d3.csv('/data/nodes.csv'),
        d3.csv('/data/edges.csv')
    ]).then((data)=>{

    var nodes = [], links = [];

    var nodesArray = data[0].splice(0,100),
        linksArray = data[1].splice(0,100)
    
    nodesArray.forEach((element)=>{nodes.push(element)})
    linksArray.forEach((element)=>{links.push(element)})

    console.log(links[2])

    simulation
        .nodes(nodes)
        .force('link', d3.forceLink(links))
        .on('tick', update)
        .force('link')
           .links(links)

    function update(){
        ctx.clearRect(0, 0, width, height)
    
        ctx.beginPath()
        links.forEach(drawLink);
        ctx.stroke()
    
        ctx.beginPath()
        nodes.forEach(drawNode);
        ctx.fill()
    }
}).catch((error)=>'Some errors')

function drawNode(d){
    ctx.moveTo(d.x, d.y)
    ctx.arc(d.x, d.y, r, 0, 2*Math.PI)
}

function drawLink(l){
    ctx.moveTo(l.source.x, l.source.y)
    ctx.lineTo(l.target.x, l.target.y)
}

