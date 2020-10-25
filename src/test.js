const container = d3.select('.container')
container.append('svg').attr('width', 960).attr('height', 600)
const svg = d3.select('svg')

var width = +svg.attr('width'),
    height = +svg.attr('height')

console.log(width,height)

var graph = {
        nodes:[
            {name:'Gaetano'},
            {name:'Hellena'},
            {name:'Maximo'},
            {name:'Sharon'},
            {name:'Godin'},
            {name:'Christian'}
        ],

        links:[
            {source:'Godina', target:'Hellena'},
            {source:'Godin', target:'Sharon'},
            {source:'Christian', target:'Maximo'},
            {source:'Christian', target:'Gaetano'},
            {source:'Sharon', target:'Gaetano'},
            {source:'Hellena', target:'Maximo'},
            {source:'Sharon', target:'Christian'},
        ]
    }

    Promise.all([
        d3.csv('/data/nodes.csv'),
        d3.csv('/data/edges.csv')
    ]).then((data)=>{

    var nodes = [], links = [];

    // var nodes = graph.nodes, links = graph.links

    var nodesArray = data[0],
        linksArray = data[1] 

    nodesArray = nodesArray.splice(0,100)
    linksArray = linksArray.splice(0,100)

    console.log(nodesArray.length)
    console.log(linksArray.length)
    
    nodesArray.forEach((element)=>{nodes.push(element)})
    linksArray.forEach((element)=>{links.push(element)}) 

    console.log(links[0])
           
    var simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links))     // fix the problem here for everthing to work
        .force('charge', d3.forceManyBody()
            .strength(-100))
        .force('collide', d3.forceCollide(100))
        .force('center', d3.forceCenter(width/2, height/3))
        .on('tick', ticked),

    link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
            .attr('stroke-width', 1)
            .style('stroke', 'green'),

    node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
            .attr('r', 5)
            .style('fill', 'red')
            .attr('stroke', 'yellow')


    function ticked(){
        link
            .attr('x1', d=>d.source.x)
            .attr('y1', d=>d.source.y)
            .attr('x2', d=>d.target.x)
            .attr('y2', d=>d.target.y)

        node
            .attr('cx', d=>d.x)
            .attr('cy', d=>d.y)
           
    }

})
// .catch((err)=>console.log('Some Errors'))

