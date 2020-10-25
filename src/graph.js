var graph = {
    nodes : [
        {'name': 'Jake', 'age':23},
        {'name': 'Joseph', 'age':3},
        {'name': 'Jaquelin', 'age':18},
        {'name': 'Jody', 'age':35},
        {'name': 'Jimmy', 'age':22},
        {'name': 'Jack', 'age':21},
        {'name': 'Jeremy', 'age':28}
    ],

    links : [
        {'source': 'Jaquelin', 'target' : 'Jack'},
        {'source': 'Jeremy', 'target' : 'Jaquelin'},
        {'source': 'Jimmy', 'target' : 'Jack'},
        {'source': 'Jody', 'target' : 'Joseph'},
        {'source': 'Jaquelin', 'target' : 'Jake'},
        {'source': 'Jody', 'target' : 'Jake'},
        {'source': 'Jaquelin', 'target' : 'Jake'},
        {'source': 'Joseph', 'target' : 'Jack'}
    ]
}

var canvas = d3.select('#network'),
    width = canvas.attr('width'),
    height = canvas.attr('height'),
    r=3,
    ctx = canvas.node().getContext('2d'),
    simulation = d3.forceSimulation()
        .force('x', d3.forceX(width/2))
        .force('y', d3.forceY(height/2))
        .force('collide', d3.forceCollide(r+2))
        .force('charge', d3.forceManyBody()
            .strength(-10))
        .force('link', d3.forceLink()
            .id((d)=>d.name))
        .on('tick', update)

simulation
    .nodes(graph.nodes)
    .force('link')
        .links(graph.links)

function update(){
    ctx.clearRect(0, 0, width, height)

    ctx.beginPath()
    graph.links.forEach(drawLink);
    ctx.stroke()

    ctx.beginPath()
    graph.nodes.forEach(drawNode);
    ctx.fill()
}

function drawNode(d){
    ctx.moveTo(d.x, d.y)
    ctx.arc(d.x, d.y, r, 0, 2*Math.PI)
}

function drawLink(l){
    ctx.moveTo(l.source.x, l.source.y)
    ctx.lineTo(l.target.x, l.target.y)
}
