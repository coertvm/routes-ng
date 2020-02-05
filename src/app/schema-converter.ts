import { Planet } from './planet';
import { Route } from './route';

export class SchemaConverter {

  private domParser: DOMParser = new DOMParser();
  private xmlSerializer: XMLSerializer = new XMLSerializer();

  constructor() { }

  formatEnvelope(getRoutesRequest: string): string {
    let xml: string = ENVELOPE;
    xml = xml.replace('<GETROUTESREQUEST/>', (getRoutesRequest ? getRoutesRequest : '<r:getRoutesRequest/>'));
    return xml;
  }

  formatGetRoutesRequest(route: string): string {
    let xml: string = GETROUTESREQUEST;
    xml = xml.replace('<ROUTE/>', (route ? route : '<r:route/>'));
    return xml;
  }

  fromRoute(route: Route): string {
    let xml: string = ROUTE;
    xml = xml.replace('<ID/>', (route.id ? route.id.toString() : ''));
    xml = xml.replace('<FROM/>', (route.from ? this.fromPlanet(route.from, 'from') : '<r:from/>'));
    xml = xml.replace('<TO/>', (route.to ? this.fromPlanet(route.to, 'to') : '<r:to/>'));
    xml = xml.replace('<DISTANCE/>', (route.distance ? route.distance.toString() : ''));
    return xml;
  }

  fromPlanet(planet: Planet, elementName: string): string {
    let xml: string = PLANET;
    xml = xml.replace('<OPEN/>', (elementName ? elementName : 'planet'));
    xml = xml.replace('<ID/>', (planet.id ? planet.id.toString() : ''));
    xml = xml.replace('<NAME/>', (planet.name ? planet.name : ''));
    xml = xml.replace('<CLOSE/>', (elementName ? elementName : 'planet'));
    return xml;
  }

  toRoute(routeNode: Node, dom: Document): Route {
    let route: Route = new Route();
    route.id = Number(this.serialise(this.elementRelative(dom, routeNode, 'r:id/text()')));
    route.from = this.toPlanet(this.elementRelative(dom, routeNode, 'r:from'), dom);
    route.to = this.toPlanet(this.elementRelative(dom, routeNode, 'r:to'), dom);
    route.distance = Number(this.serialise(this.elementRelative(dom, routeNode, 'r:distance/text()')));
    return route;
  }

  toPlanet(planetNode: Node, dom: Document): Planet {
    let planet: Planet = new Planet();
    planet.id = Number(this.serialise(this.elementRelative(dom, planetNode, 'r:id/text()')));
    planet.name = this.serialise(this.elementRelative(dom, planetNode, 'r:name/text()'));
    return planet;
  }
  
  marshall(xml: string): Document {
    return this.domParser.parseFromString(xml, 'application/xml');
  }
  
  elementsRelative(dom: Document, node: Node, xpath: string): XPathResult {
    return dom.evaluate(xpath, node, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  }
  
  elements(dom: Document, xpath: string): XPathResult {
    return this.elementsRelative(dom, dom, xpath);
  }
  
  elementRelative(dom: Document, node: Node, xpath: string): Node {
    return this.elementsRelative(dom, node, xpath).iterateNext();
  }
  
  element(dom: Document, xpath: string): Node {
    return this.elements(dom, xpath).iterateNext();
  }

  serialise(obj): string {
    return this.xmlSerializer.serializeToString(obj);
  }

}

function nsResolver(prefix) {
  var ns = NAMESPACES;
  return ns[prefix] || null;
}

const NAMESPACES = {
  's' : 'http://schemas.xmlsoap.org/soap/envelope/',
  'r' : 'http://coertvm/routes'
};

const ENVELOPE: string =
  '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" xmlns:r="http://coertvm/routes">' +
  '<s:Header/>' +
  '<s:Body>' +
  '<GETROUTESREQUEST/>' +
  '</s:Body>' +
  '</s:Envelope>';

const GETROUTESREQUEST: string =
  '<r:getRoutesRequest>' +
  '<ROUTE/>' +
  '</r:getRoutesRequest>';

const ROUTE: string =
  '<r:route>' +
  '<r:id><ID/></r:id>' +
  '<FROM/>' +
  '<TO/>' +
  '<r:distance><DISTANCE/></r:distance>' +
  '</r:route>';

const PLANET: string =
  '<r:<OPEN/>>' +
  '<r:id><ID/></r:id>' +
  '<r:name><NAME/></r:name>' +
  '</r:<CLOSE/>>';