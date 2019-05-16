class Edge {
    constructor(from, to, weight){
        this.from = from;
        this.to = to;

        this.weight = weight;
    }
}

class Vertex {
    constructor(data, index){
        this.data = data;
        this.index = index;
    }
}

class Graph {
    constructor(){
        this.edges = [];
        this.vertex = [];
    }

    addEdge(edge){
        this.edges.push(edge);
    }

    addVertex(vertex){
        this.edges.push(vertex);
    }

    getEdges(){
        return this.edges;
    }

    getVertex(){
        return this.vertex;
    }
    getMatrix() {



    }
}

let MyGraph = new Graph();

MyGraph.addVertex(new Vertex('A', 0));
MyGraph.addVertex(new Vertex('B', 1));
MyGraph.addVertex(new Vertex('C', 2));
MyGraph.addVertex(new Vertex('D', 3));

MyGraph.addEdge(new Edge('A', 'B',3));
MyGraph.addEdge(new Edge('A', 'C',5));
MyGraph.addEdge(new Edge('B', 'C',4));
MyGraph.addEdge(new Edge('C', 'D',2));
MyGraph.addEdge(new Edge('D', 'B',7));


export default MyGraph;