import React, {FunctionComponent } from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import App from './App';
import VisibleComponent from './visibleComponent';
import ComponentExplanation from './componentExplanation';
import Parent from './parent';
import styles from './myName.module.css';
import PieChart from './Pie'
import BrushChart from './AreaChartComponent'
import CSS from 'csstype';
import TreeMap from 'react-d3-treemap'
import 'react-d3-treemap/dist/react.d3.treemap.css'
import { animated, useTransition, interpolate } from 'react-spring';
import Pie, { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { GradientPinkBlue } from '@visx/gradient';
import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import browserUsage, { BrowserUsage as Browsers } from '@visx/mock-data/lib/mocks/browserUsage';



var slide = 0;


type CardProps = {
    title: string,
    paragraph: string
}
// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type ClockState = {
    input: string
    time: Date
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class Clock extends React.Component<{}, ClockState> {

    // The tick function sets the current state. TypeScript will let us know
    // which ones we are allowed to set.
    tick() {
        this.setState({
            time: new Date()
        });
    }

    // Before the component mounts, we initialise our state
    componentWillMount() {
        this.tick();
    }

    // After the component did mount, we set the state each second.
    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }

    // render will know everything!
    render() {
        return <p>The current time is {this.state.time.toLocaleTimeString()}</p>
    }
}

// we can use children even though we haven't defined them in our CardProps
export const Card: FunctionComponent<CardProps> = ({ title, paragraph, children }) => <aside>
    <h2>{ title }</h2>
    <p>
        { paragraph }
    </p>
    { children }
</aside>

const el = <Card title="Welcome!" paragraph="To this example" />









type NoticeProps = {
    msg: string
}

export class Notice extends React.Component<NoticeProps> {

    constructor(props: NoticeProps) {
        super(props)
    }

    static defaultProps = {
        msg: 'Hello everyone!'
    }

    render() {
        return <p>{ this.props.msg }</p>
    }
}

const noticeEl = <Notice /> // Will compile in TS 3.0






type WrapperProps = {
    clockEl : Clock
}

const h1Styles: CSS.Properties = {
    display: 'inline-block',
    padding: '0.35em 1.2em',
    boxSizing: 'border-box',
    borderRadius: '0.12em',
    border: '0.1em solid #FFFFFF',
    margin: '0 0.3em 0.3em 0',
    textDecoration: 'none',
    transition: 'all 0.2s',
    backgroundColor: 'rgb(0,0,0)',
    float: 'left',
    color : 'white',
    fontFamily: 'sans-serif',
    font: 'Montserrat',
    fontSize: '10px',

};

const titleStyle: CSS.Properties = {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'sans-serif',
    font: 'montserrat',
    fontSize: '40px',
    opacity:'1'
}
const explanationStyle: CSS.Properties = {
    float: 'left',
    color: 'white',
    width: '500px',
    fontSize: '26px',
 //   background: '#15182f',
    borderRadius: '15px', /*All corners*/
    padding:'10px',
    top:'140px',
    right:'30%',
    opacity:'1',
}

const PieTitle = "Interactive Pie/Donut Chart"
const BrushTitle = "Brush Chart"
const TreeMapTitle = "Navigable Treemap"
export class PieExplanation extends React.Component {
    render() {
        return <ul>
            <li>User portfolio breakdown</li>
            <li>Institutional ownership</li>
            <li>Sectors</li>
        </ul>
    }
}
export class BrushExplanation extends React.Component {
    render() {
        return <ul>
            <li>Mini charts for when more complex charts would be impractical</li>
            <li>User equity/drawdown graph</li>
        </ul>
    }
}
export class TreeMapExplanation extends React.Component {
    render() {
        return <ul>
            <li>Navigable treemap or heatmap</li>
            <li>Zoom on clicked square to reveal more views/visuals</li>
        </ul>
    }
}

export class Wrapper extends React.Component {


    render() {
        return <div style={ { display: 'flex' } }>
            { this.props.children }
        </div>
    }
}

export class Button extends React.Component<{},{clicks:number}> {
    constructor(props: {} | Readonly<{}>){
        super(props);
        this.state = {
            clicks: 0
        }
    }

    handleClick(event: MouseEvent) {
        event.preventDefault();

        this.setState((prevState) => ({
            // @ts-ignore
            clicks: Math.min(prevState.clicks + 1,2)

              }));

        //this.setState({clicks:this.state.clicks+1 })
        //alert(event.currentTarget.tagName); // alerts BUTTON
    }

    handleClick2(event: MouseEvent) {
        event.preventDefault();

        this.setState((prevState) => ({
            // @ts-ignore
            clicks: Math.max(0,prevState.clicks - 1)
        }));
    }

    render(){

        return (

            <div>
                <h1 style={titleStyle}>{this.state.clicks==0 ? PieTitle : this.state.clicks == 1 ? BrushTitle : TreeMapTitle}</h1>
                <div>
                    <div style={{float:"left",paddingTop:'120px',paddingLeft:'120px'}}>
                        {this.state.clicks==0 ? <PieChart width={window.innerWidth/2} height={window.innerHeight/2}/> :
                             this.state.clicks==1 ?  <BrushChart width={window.innerWidth/2} height={window.innerHeight/2}/> :
                                 <TreeMap width={window.innerWidth/2} height={window.innerHeight/2} data={data} valueUnit={"$"}/>
                        }

                    </div>
                    <div style={{float:"left",paddingTop:'120px'}}>
                        <div style={explanationStyle}>
                            {this.state.clicks == 0 ? <PieExplanation /> : this.state.clicks == 1 ? <BrushExplanation /> : <TreeMapExplanation />}

                            <div style={{float:'left'}}>
                                <button style={h1Styles} id={"componentExplanation2"}
                                    // @ts-ignore
                                        onClick={this.handleClick2.bind(this)}>
                                    <h2>Prev</h2>
                                </button>
                                <button style={h1Styles} id={"componentExplanation"}
                                    // @ts-ignore
                                        onClick={this.handleClick.bind(this)}>
                                    <h2>Next</h2>
                                </button>
                          </div>

                        </div>

                    </div>

                </div>
            </div>
        )

        // @ts-ignore
      /*  return (<button id="button1" onClick={this.handleClick.bind(this)}>
            <h2>Button1 + {this.state.clicks}</h2>
        </button>
        )*/
    }
}

function fadeOutEffect() {
    var fadeTarget = document.getElementById("wrap");
    var fadeEffect = setInterval(function () {
        // @ts-ignore
        if (!fadeTarget.style.opacity) {
            // @ts-ignore
            fadeTarget.style.opacity = String(1);
        }
        // @ts-ignore
        if (fadeTarget.style.opacity > 0) {
            // @ts-ignore
                 fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 30);

}

// @ts-ignore
//document.getElementById("componentExplanation").addEventListener('click', fadeOutEffect)

render (<Button />,document.getElementById('wrap'))

// Nothing should be rendered!
/*
console.log("Clicks")
render(<Parent />,document.getElementById('root'))
*/

// Format
// name: name of the file or folder
// type: folder or file
// value: number of bytes of the doc (calculated at folder level by d3)
// children: sub files or sub folders

export const data = {
    name: "flare",
    children: [
        {
            name: "analytics",
            link: "https://blog.josequinto.com",
            children: [
                {
                    name: "cluster",
                    children: [
                        {
                            name: "AgglomerativeCluster",
                            value: 3938,
                            link: "https://blog.josequinto.com"
                        },
                        { name: "CommunityStructure", value: 3812 },
                        { name: "HierarchicalCluster", value: 6714 },
                        { name: "MergeEdge", value: 743 }
                    ]
                },
                {
                    name: "graph",
                    children: [
                        { name: "BetweennessCentrality", value: 3534 },
                        { name: "LinkDistance", value: 5731 },
                        { name: "MaxFlowMinCut", value: 7840 },
                        { name: "ShortestPaths", value: 5914 },
                        { name: "SpanningTree", value: 3416 }
                    ]
                },
                {
                    name: "optimization",
                    children: [{ name: "AspectRatioBanker", value: 7074 }]
                }
            ]
        },
        {
            name: "animate",
            children: [
                { name: "Easing", value: 17010 },
                { name: "FunctionSequence", value: 5842 },
                {
                    name: "interpolate",
                    children: [
                        { name: "ArrayInterpolator", value: 1983 },
                        { name: "ColorInterpolator", value: 2047 },
                        { name: "DateInterpolator", value: 1375 },
                        { name: "Interpolator", value: 8746 },
                        { name: "MatrixInterpolator", value: 2202 },
                        { name: "NumberInterpolator", value: 1382 },
                        { name: "ObjectInterpolator", value: 1629 },
                        { name: "PointInterpolator", value: 1675 },
                        { name: "RectangleInterpolator", value: 2042 }
                    ]
                },
                { name: "ISchedulable", value: 1041 },
                { name: "Parallel", value: 5176 },
                { name: "Pause", value: 449 },
                { name: "Scheduler", value: 5593 },
                { name: "Sequence", value: 5534 },
                { name: "Transition", value: 9201 },
                { name: "Transitioner", value: 19975 },
                { name: "TransitionEvent", value: 1116 },
                { name: "Tween", value: 6006 }
            ]
        },
        {
            name: "data",
            children: [
                {
                    name: "converters",
                    children: [
                        { name: "Converters", value: 721 },
                        { name: "DelimitedTextConverter", value: 4294 },
                        { name: "GraphMLConverter", value: 9800 },
                        { name: "IDataConverter", value: 1314 },
                        { name: "JSONConverter", value: 2220 }
                    ]
                },
                { name: "DataField", value: 1759 },
                { name: "DataSchema", value: 2165 },
                { name: "DataSet", value: 586 },
                { name: "DataSource", value: 3331 },
                { name: "DataTable", value: 772 },
                { name: "DataUtil", value: 3322 }
            ]
        },
        {
            name: "display",
            children: [
                { name: "DirtySprite", value: 8833 },
                { name: "LineSprite", value: 1732 },
                { name: "RectSprite", value: 3623 },
                { name: "TextSprite", value: 10066 }
            ]
        },
        {
            name: "flex",
            children: [{ name: "FlareVis", value: 4116 }]
        },
        {
            name: "physics",
            children: [
                { name: "DragForce", value: 1082 },
                { name: "GravityForce", value: 1336 },
                { name: "IForce", value: 319 },
                { name: "NBodyForce", value: 10498 },
                { name: "Particle", value: 2822 },
                { name: "Simulation", value: 9983 },
                { name: "Spring", value: 2213 },
                { name: "SpringForce", value: 1681 }
            ]
        },
        {
            name: "query",
            children: [
                { name: "AggregateExpression", value: 1616 },
                { name: "And", value: 1027 },
                { name: "Arithmetic", value: 3891 },
                { name: "Average", value: 891 },
                { name: "BinaryExpression", value: 2893 },
                { name: "Comparison", value: 5103 },
                { name: "CompositeExpression", value: 3677 },
                { name: "Count", value: 781 },
                { name: "DateUtil", value: 4141 },
                { name: "Distinct", value: 933 },
                { name: "Expression", value: 5130 },
                { name: "ExpressionIterator", value: 3617 },
                { name: "Fn", value: 3240 },
                { name: "If", value: 2732 },
                { name: "IsA", value: 2039 },
                { name: "Literal", value: 1214 },
                { name: "Match", value: 3748 },
                { name: "Maximum", value: 843 },
                {
                    name: "methods",
                    children: [
                        { name: "add", value: 593 },
                        { name: "and", value: 330 },
                        { name: "average", value: 287 },
                        { name: "count", value: 277 },
                        { name: "distinct", value: 292 },
                        { name: "div", value: 595 },
                        { name: "eq", value: 594 },
                        { name: "fn", value: 460 },
                        { name: "gt", value: 603 },
                        { name: "gte", value: 625 },
                        { name: "iff", value: 748 },
                        { name: "isa", value: 461 },
                        { name: "lt", value: 597 },
                        { name: "lte", value: 619 },
                        { name: "max", value: 283 },
                        { name: "min", value: 283 },
                        { name: "mod", value: 591 },
                        { name: "mul", value: 603 },
                        { name: "neq", value: 599 },
                        { name: "not", value: 386 },
                        { name: "or", value: 323 },
                        { name: "orderby", value: 307 },
                        { name: "range", value: 772 },
                        { name: "select", value: 296 },
                        { name: "stddev", value: 363 },
                        { name: "sub", value: 600 },
                        { name: "sum", value: 280 },
                        { name: "update", value: 307 },
                        { name: "variance", value: 335 },
                        { name: "where", value: 299 },
                        { name: "xor", value: 354 },
                        { name: "_", value: 264 }
                    ]
                },
                { name: "Minimum", value: 843 },
                { name: "Not", value: 1554 },
                { name: "Or", value: 970 },
                { name: "Query", value: 13896 },
                { name: "Range", value: 1594 },
                { name: "StringUtil", value: 4130 },
                { name: "Sum", value: 791 },
                { name: "Variable", value: 1124 },
                { name: "Variance", value: 1876 },
                { name: "Xor", value: 1101 }
            ]
        },
        {
            name: "scale",
            children: [
                { name: "IScaleMap", value: 2105 },
                { name: "LinearScale", value: 1316 },
                { name: "LogScale", value: 3151 },
                { name: "OrdinalScale", value: 3770 },
                { name: "QuantileScale", value: 2435 },
                { name: "QuantitativeScale", value: 4839 },
                { name: "RootScale", value: 1756 },
                { name: "Scale", value: 4268 },
                { name: "ScaleType", value: 1821 },
                { name: "TimeScale", value: 5833 }
            ]
        },
        {
            name: "util",
            children: [
                { name: "Arrays", value: 8258 },
                { name: "Colors", value: 10001 },
                { name: "Dates", value: 8217 },
                { name: "Displays", value: 12555 },
                { name: "Filter", value: 2324 },
                { name: "Geometry", value: 10993 },
                {
                    name: "heap",
                    children: [
                        { name: "FibonacciHeap", value: 9354 },
                        { name: "HeapNode", value: 1233 }
                    ]
                },
                { name: "IEvaluable", value: 335 },
                { name: "IPredicate", value: 383 },
                { name: "IValueProxy", value: 874 },
                {
                    name: "math",
                    children: [
                        { name: "DenseMatrix", value: 3165 },
                        { name: "IMatrix", value: 2815 },
                        { name: "SparseMatrix", value: 3366 }
                    ]
                },
                { name: "Maths", value: 17705 },
                { name: "Orientation", value: 1486 },
                {
                    name: "palette",
                    children: [
                        { name: "ColorPalette", value: 6367 },
                        { name: "Palette", value: 1229 },
                        { name: "ShapePalette", value: 2059 },
                        { name: "SizePalette", value: 2291 }
                    ]
                },
                { name: "Property", value: 5559 },
                { name: "Shapes", value: 19118 },
                { name: "Sort", value: 6887 },
                { name: "Stats", value: 6557 },
                { name: "Strings", value: 22026 }
            ]
        },
        {
            name: "AAPL",
            children: [
                {
                    name: "axis",
                    children: [
                        { name: "Axes", value: 1302 },
                        { name: "Axis", value: 24593 },
                        { name: "AxisGridLine", value: 652 },
                        { name: "AxisLabel", value: 636 },
                        { name: "CartesianAxes", value: 6703 }
                    ]
                },
                {
                    name: "controls",
                    children: [
                        { name: "AnchorControl", value: 2138 },
                        { name: "ClickControl", value: 3824 },
                        { name: "Control", value: 1353 },
                        { name: "ControlList", value: 4665 },
                        { name: "DragControl", value: 2649 },
                        { name: "ExpandControl", value: 2832 },
                        { name: "HoverControl", value: 4896 },
                        { name: "IControl", value: 763 },
                        { name: "PanZoomControl", value: 5222 },
                        { name: "SelectionControl", value: 7862 },
                        { name: "TooltipControl", value: 8435 }
                    ]
                },
                {
                    name: "data",
                    children: [
                        { name: "Data", value: 20544 },
                        { name: "DataList", value: 19788 },
                        { name: "DataSprite", value: 10349 },
                        { name: "EdgeSprite", value: 3301 },
                        { name: "NodeSprite", value: 19382 },
                        {
                            name: "render",
                            children: [
                                { name: "ArrowType", value: 698 },
                                { name: "EdgeRenderer", value: 5569 },
                                { name: "IRenderer", value: 353 },
                                { name: "ShapeRenderer", value: 2247 }
                            ]
                        },
                        { name: "ScaleBinding", value: 11275 },
                        { name: "Tree", value: 7147 },
                        { name: "TreeBuilder", value: 9930 }
                    ]
                },
                {
                    name: "events",
                    children: [
                        { name: "DataEvent", value: 2313 },
                        { name: "SelectionEvent", value: 1880 },
                        { name: "TooltipEvent", value: 1701 },
                        { name: "VisualizationEvent", value: 1117 }
                    ]
                },
                {
                    name: "legend",
                    children: [
                        { name: "Legend", value: 20859 },
                        { name: "LegendItem", value: 4614 },
                        { name: "LegendRange", value: 10530 }
                    ]
                },
                {
                    name: "operator",
                    children: [
                        {
                            name: "distortion",
                            children: [
                                { name: "BifocalDistortion", value: 4461 },
                                { name: "Distortion", value: 6314 },
                                { name: "FisheyeDistortion", value: 3444 }
                            ]
                        },
                        {
                            name: "encoder",
                            children: [
                                { name: "ColorEncoder", value: 3179 },
                                { name: "Encoder", value: 4060 },
                                { name: "PropertyEncoder", value: 4138 },
                                { name: "ShapeEncoder", value: 1690 },
                                { name: "SizeEncoder", value: 1830 }
                            ]
                        },
                        {
                            name: "filter",
                            children: [
                                { name: "FisheyeTreeFilter", value: 5219 },
                                { name: "GraphDistanceFilter", value: 3165 },
                                { name: "VisibilityFilter", value: 3509 }
                            ]
                        },
                        { name: "IOperator", value: 1286 },
                        {
                            name: "label",
                            children: [
                                { name: "Labeler", value: 9956 },
                                { name: "RadialLabeler", value: 3899 },
                                { name: "StackedAreaLabeler", value: 3202 }
                            ]
                        },
                        {
                            name: "layout",
                            children: [
                                { name: "AxisLayout", value: 6725 },
                                { name: "BundledEdgeRouter", value: 3727 },
                                { name: "CircleLayout", value: 9317 },
                                { name: "CirclePackingLayout", value: 12003 },
                                { name: "DendrogramLayout", value: 4853 },
                                { name: "ForceDirectedLayout", value: 8411 },
                                { name: "IcicleTreeLayout", value: 4864 },
                                { name: "IndentedTreeLayout", value: 3174 },
                                { name: "Layout", value: 7881 },
                                { name: "NodeLinkTreeLayout", value: 12870 },
                                { name: "PieLayout", value: 2728 },
                                { name: "RadialTreeLayout", value: 12348 },
                                { name: "RandomLayout", value: 870 },
                                { name: "StackedAreaLayout", value: 9121 },
                                { name: "TreeMapLayout", value: 9191 }
                            ]
                        },
                        { name: "Operator", value: 2490 },
                        { name: "OperatorList", value: 5248 },
                        { name: "OperatorSequence", value: 4190 },
                        { name: "OperatorSwitch", value: 2581 },
                        { name: "SortOperator", value: 2023 }
                    ]
                },
                { name: "Visualization", value: 16540 }
            ]
        },
        {
            name: "analytics",
            children: [
                {
                    name: "cluster",
                    children: [
                        { name: "AgglomerativeCluster", value: 3938 },
                        { name: "CommunityStructure", value: 3812 },
                        { name: "HierarchicalCluster", value: 6714 },
                        { name: "MergeEdge", value: 743 }
                    ]
                },
                {
                    name: "graph",
                    children: [
                        { name: "BetweennessCentrality", value: 3534 },
                        { name: "LinkDistance", value: 5731 },
                        { name: "MaxFlowMinCut", value: 7840 },
                        { name: "ShortestPaths", value: 5914 },
                        { name: "SpanningTree", value: 3416 }
                    ]
                },
                {
                    name: "optimization",
                    children: [{ name: "AspectRatioBanker", value: 7074 }]
                }
            ]
        },
        {
            name: "animate",
            children: [
                { name: "Easing", value: 17010 },
                { name: "FunctionSequence", value: 5842 },
                {
                    name: "interpolate",
                    children: [
                        { name: "ArrayInterpolator", value: 1983 },
                        { name: "ColorInterpolator", value: 2047 },
                        { name: "DateInterpolator", value: 1375 },
                        { name: "Interpolator", value: 8746 },
                        { name: "MatrixInterpolator", value: 2202 },
                        { name: "NumberInterpolator", value: 1382 },
                        { name: "ObjectInterpolator", value: 1629 },
                        { name: "PointInterpolator", value: 1675 },
                        { name: "RectangleInterpolator", value: 2042 }
                    ]
                },
                { name: "ISchedulable", value: 1041 },
                { name: "Parallel", value: 5176 },
                { name: "Pause", value: 449 },
                { name: "Scheduler", value: 5593 },
                { name: "Sequence", value: 5534 },
                { name: "Transition", value: 9201 },
                { name: "Transitioner", value: 19975 },
                { name: "TransitionEvent", value: 1116 },
                { name: "Tween", value: 6006 }
            ]
        },
        {
            name: "data",
            children: [
                {
                    name: "converters",
                    children: [
                        { name: "Converters", value: 721 },
                        { name: "DelimitedTextConverter", value: 4294 },
                        { name: "GraphMLConverter", value: 9800 },
                        { name: "IDataConverter", value: 1314 },
                        { name: "JSONConverter", value: 2220 }
                    ]
                },
                { name: "DataField", value: 1759 },
                { name: "DataSchema", value: 2165 },
                { name: "DataSet", value: 586 },
                { name: "DataSource", value: 3331 },
                { name: "DataTable", value: 772 },
                { name: "DataUtil", value: 3322 }
            ]
        },
        {
            name: "display",
            children: [
                { name: "DirtySprite", value: 8833 },
                { name: "LineSprite", value: 1732 },
                { name: "RectSprite", value: 3623 },
                { name: "TextSprite", value: 10066 }
            ]
        },
        {
            name: "flex",
            children: [{ name: "FlareVis", value: 4116 }]
        },
        {
            name: "physics",
            children: [
                { name: "DragForce", value: 1082 },
                { name: "GravityForce", value: 1336 },
                { name: "IForce", value: 319 },
                { name: "NBodyForce", value: 10498 },
                { name: "Particle", value: 2822 },
                { name: "Simulation", value: 9983 },
                { name: "Spring", value: 2213 },
                { name: "SpringForce", value: 1681 }
            ]
        },
        {
            name: "query",
            children: [
                { name: "AggregateExpression", value: 1616 },
                { name: "And", value: 1027 },
                { name: "Arithmetic", value: 3891 },
                { name: "Average", value: 891 },
                { name: "BinaryExpression", value: 2893 },
                { name: "Comparison", value: 5103 },
                { name: "CompositeExpression", value: 3677 },
                { name: "Count", value: 781 },
                { name: "DateUtil", value: 4141 },
                { name: "Distinct", value: 933 },
                { name: "Expression", value: 5130 },
                { name: "ExpressionIterator", value: 3617 },
                { name: "Fn", value: 3240 },
                { name: "If", value: 2732 },
                { name: "IsA", value: 2039 },
                { name: "Literal", value: 1214 },
                { name: "Match", value: 3748 },
                { name: "Maximum", value: 843 },
                {
                    name: "methods",
                    children: [
                        { name: "add", value: 593 },
                        { name: "and", value: 330 },
                        { name: "average", value: 287 },
                        { name: "count", value: 277 },
                        { name: "distinct", value: 292 },
                        { name: "div", value: 595 },
                        { name: "eq", value: 594 },
                        { name: "fn", value: 460 },
                        { name: "gt", value: 603 },
                        { name: "gte", value: 625 },
                        { name: "iff", value: 748 },
                        { name: "isa", value: 461 },
                        { name: "lt", value: 597 },
                        { name: "lte", value: 619 },
                        { name: "max", value: 283 },
                        { name: "min", value: 283 },
                        { name: "mod", value: 591 },
                        { name: "mul", value: 603 },
                        { name: "neq", value: 599 },
                        { name: "not", value: 386 },
                        { name: "or", value: 323 },
                        { name: "orderby", value: 307 },
                        { name: "range", value: 772 },
                        { name: "select", value: 296 },
                        { name: "stddev", value: 363 },
                        { name: "sub", value: 600 },
                        { name: "sum", value: 280 },
                        { name: "update", value: 307 },
                        { name: "variance", value: 335 },
                        { name: "where", value: 299 },
                        { name: "xor", value: 354 },
                        { name: "_", value: 264 }
                    ]
                },
                { name: "Minimum", value: 843 },
                { name: "Not", value: 1554 },
                { name: "Or", value: 970 },
                { name: "Query", value: 13896 },
                { name: "Range", value: 1594 },
                { name: "StringUtil", value: 4130 },
                { name: "Sum", value: 791 },
                { name: "Variable", value: 1124 },
                { name: "Variance", value: 1876 },
                { name: "Xor", value: 1101 }
            ]
        },
        {
            name: "scale",
            children: [
                { name: "IScaleMap", value: 2105 },
                { name: "LinearScale", value: 1316 },
                { name: "LogScale", value: 3151 },
                { name: "OrdinalScale", value: 3770 },
                { name: "QuantileScale", value: 2435 },
                { name: "QuantitativeScale", value: 4839 },
                { name: "RootScale", value: 1756 },
                { name: "Scale", value: 4268 },
                { name: "ScaleType", value: 1821 },
                { name: "TimeScale", value: 5833 }
            ]
        },
        {
            name: "util",
            children: [
                { name: "Arrays", value: 8258 },
                { name: "Colors", value: 10001 },
                { name: "Dates", value: 8217 },
                { name: "Displays", value: 12555 },
                { name: "Filter", value: 2324 },
                { name: "Geometry", value: 10993 },
                {
                    name: "heap",
                    children: [
                        { name: "FibonacciHeap", value: 9354 },
                        { name: "HeapNode", value: 1233 }
                    ]
                },
                { name: "IEvaluable", value: 335 },
                { name: "IPredicate", value: 383 },
                { name: "IValueProxy", value: 874 },
                {
                    name: "math",
                    children: [
                        { name: "DenseMatrix", value: 3165 },
                        { name: "IMatrix", value: 2815 },
                        { name: "SparseMatrix", value: 3366 }
                    ]
                },
                { name: "Maths", value: 17705 },
                { name: "Orientation", value: 1486 },
                {
                    name: "palette",
                    children: [
                        { name: "ColorPalette", value: 6367 },
                        { name: "Palette", value: 1229 },
                        { name: "ShapePalette", value: 2059 },
                        { name: "SizePalette", value: 2291 }
                    ]
                },
                { name: "Property", value: 5559 },
                { name: "Shapes", value: 19118 },
                { name: "Sort", value: 6887 },
                { name: "Stats", value: 6557 },
                { name: "Strings", value: 22026 }
            ]
        },
        {
            name: "IBM",
            children: [
                {
                    name: "axis",
                    children: [
                        { name: "Axes", value: 1302 },
                        { name: "Axis", value: 24593 },
                        { name: "AxisGridLine", value: 652 },
                        { name: "AxisLabel", value: 636 },
                        { name: "CartesianAxes", value: 6703 }
                    ]
                },
                {
                    name: "controls",
                    children: [
                        { name: "AnchorControl", value: 2138 },
                        { name: "ClickControl", value: 3824 },
                        { name: "Control", value: 1353 },
                        { name: "ControlList", value: 4665 },
                        { name: "DragControl", value: 2649 },
                        { name: "ExpandControl", value: 2832 },
                        { name: "HoverControl", value: 4896 },
                        { name: "IControl", value: 763 },
                        { name: "PanZoomControl", value: 5222 },
                        { name: "SelectionControl", value: 7862 },
                        { name: "TooltipControl", value: 8435 }
                    ]
                },
                {
                    name: "data",
                    children: [
                        { name: "Data", value: 20544 },
                        { name: "DataList", value: 19788 },
                        { name: "DataSprite", value: 10349 },
                        { name: "EdgeSprite", value: 3301 },
                        { name: "NodeSprite", value: 19382 },
                        {
                            name: "render",
                            children: [
                                { name: "ArrowType", value: 698 },
                                { name: "EdgeRenderer", value: 5569 },
                                { name: "IRenderer", value: 353 },
                                { name: "ShapeRenderer", value: 2247 }
                            ]
                        },
                        { name: "ScaleBinding", value: 11275 },
                        { name: "Tree", value: 7147 },
                        { name: "TreeBuilder", value: 9930 }
                    ]
                },
                {
                    name: "events",
                    children: [
                        { name: "DataEvent", value: 2313 },
                        { name: "SelectionEvent", value: 1880 },
                        { name: "TooltipEvent", value: 1701 },
                        { name: "VisualizationEvent", value: 1117 }
                    ]
                },
                {
                    name: "legend",
                    children: [
                        { name: "Legend", value: 20859 },
                        { name: "LegendItem", value: 4614 },
                        { name: "LegendRange", value: 10530 }
                    ]
                },
                {
                    name: "operator",
                    children: [
                        {
                            name: "distortion",
                            children: [
                                { name: "BifocalDistortion", value: 4461 },
                                { name: "Distortion", value: 6314 },
                                { name: "FisheyeDistortion", value: 3444 }
                            ]
                        },
                        {
                            name: "encoder",
                            children: [
                                { name: "ColorEncoder", value: 3179 },
                                { name: "Encoder", value: 4060 },
                                { name: "PropertyEncoder", value: 4138 },
                                { name: "ShapeEncoder", value: 1690 },
                                { name: "SizeEncoder", value: 1830 }
                            ]
                        },
                        {
                            name: "filter",
                            children: [
                                { name: "FisheyeTreeFilter", value: 5219 },
                                { name: "GraphDistanceFilter", value: 3165 },
                                { name: "VisibilityFilter", value: 3509 }
                            ]
                        },
                        { name: "IOperator", value: 1286 },
                        {
                            name: "label",
                            children: [
                                { name: "Labeler", value: 9956 },
                                { name: "RadialLabeler", value: 3899 },
                                { name: "StackedAreaLabeler", value: 3202 }
                            ]
                        },
                        {
                            name: "layout",
                            children: [
                                { name: "AxisLayout", value: 6725 },
                                { name: "BundledEdgeRouter", value: 3727 },
                                { name: "CircleLayout", value: 9317 },
                                { name: "CirclePackingLayout", value: 12003 },
                                { name: "DendrogramLayout", value: 4853 },
                                { name: "ForceDirectedLayout", value: 8411 },
                                { name: "IcicleTreeLayout", value: 4864 },
                                { name: "IndentedTreeLayout", value: 3174 },
                                { name: "Layout", value: 7881 },
                                { name: "NodeLinkTreeLayout", value: 12870 },
                                { name: "PieLayout", value: 2728 },
                                { name: "RadialTreeLayout", value: 12348 },
                                { name: "RandomLayout", value: 870 },
                                { name: "StackedAreaLayout", value: 9121 },
                                { name: "TreeMapLayout", value: 9191 }
                            ]
                        },
                        { name: "Operator", value: 2490 },
                        { name: "OperatorList", value: 5248 },
                        { name: "OperatorSequence", value: 4190 },
                        { name: "OperatorSwitch", value: 2581 },
                        { name: "SortOperator", value: 2023 }
                    ]
                },
                { name: "Visualization", value: 16540 }
            ]
        },
        {
            name: "analytics",
            children: [
                {
                    name: "cluster",
                    children: [
                        { name: "AgglomerativeCluster", value: 3938 },
                        { name: "CommunityStructure", value: 3812 },
                        { name: "HierarchicalCluster", value: 6714 },
                        { name: "MergeEdge", value: 743 }
                    ]
                },
                {
                    name: "graph",
                    children: [
                        { name: "BetweennessCentrality", value: 3534 },
                        { name: "LinkDistance", value: 5731 },
                        { name: "MaxFlowMinCut", value: 7840 },
                        { name: "ShortestPaths", value: 5914 },
                        { name: "SpanningTree", value: 3416 }
                    ]
                },
                {
                    name: "optimization",
                    children: [{ name: "AspectRatioBanker", value: 7074 }]
                }
            ]
        },
        {
            name: "animate",
            children: [
                { name: "Easing", value: 17010 },
                { name: "FunctionSequence", value: 5842 },
                {
                    name: "interpolate",
                    children: [
                        { name: "ArrayInterpolator", value: 1983 },
                        { name: "ColorInterpolator", value: 2047 },
                        { name: "DateInterpolator", value: 1375 },
                        { name: "Interpolator", value: 8746 },
                        { name: "MatrixInterpolator", value: 2202 },
                        { name: "NumberInterpolator", value: 1382 },
                        { name: "ObjectInterpolator", value: 1629 },
                        { name: "PointInterpolator", value: 1675 },
                        { name: "RectangleInterpolator", value: 2042 }
                    ]
                },
                { name: "ISchedulable", value: 1041 },
                { name: "Parallel", value: 5176 },
                { name: "Pause", value: 449 },
                { name: "Scheduler", value: 5593 },
                { name: "Sequence", value: 5534 },
                { name: "Transition", value: 9201 },
                { name: "Transitioner", value: 19975 },
                { name: "TransitionEvent", value: 1116 },
                { name: "Tween", value: 6006 }
            ]
        },
        {
            name: "data",
            children: [
                {
                    name: "converters",
                    children: [
                        { name: "Converters", value: 721 },
                        { name: "DelimitedTextConverter", value: 4294 },
                        { name: "GraphMLConverter", value: 9800 },
                        { name: "IDataConverter", value: 1314 },
                        { name: "JSONConverter", value: 2220 }
                    ]
                },
                { name: "DataField", value: 1759 },
                { name: "DataSchema", value: 2165 },
                { name: "DataSet", value: 586 },
                { name: "DataSource", value: 3331 },
                { name: "DataTable", value: 772 },
                { name: "DataUtil", value: 3322 }
            ]
        },
        {
            name: "display",
            children: [
                { name: "DirtySprite", value: 8833 },
                { name: "LineSprite", value: 1732 },
                { name: "RectSprite", value: 3623 },
                { name: "TextSprite", value: 10066 }
            ]
        },
        {
            name: "flex",
            children: [{ name: "FlareVis", value: 4116 }]
        },
        {
            name: "physics",
            children: [
                { name: "DragForce", value: 1082 },
                { name: "GravityForce", value: 1336 },
                { name: "IForce", value: 319 },
                { name: "NBodyForce", value: 10498 },
                { name: "Particle", value: 2822 },
                { name: "Simulation", value: 9983 },
                { name: "Spring", value: 2213 },
                { name: "SpringForce", value: 1681 }
            ]
        },
        {
            name: "query",
            children: [
                { name: "AggregateExpression", value: 1616 },
                { name: "And", value: 1027 },
                { name: "Arithmetic", value: 3891 },
                { name: "Average", value: 891 },
                { name: "BinaryExpression", value: 2893 },
                { name: "Comparison", value: 5103 },
                { name: "CompositeExpression", value: 3677 },
                { name: "Count", value: 781 },
                { name: "DateUtil", value: 4141 },
                { name: "Distinct", value: 933 },
                { name: "Expression", value: 5130 },
                { name: "ExpressionIterator", value: 3617 },
                { name: "Fn", value: 3240 },
                { name: "If", value: 2732 },
                { name: "IsA", value: 2039 },
                { name: "Literal", value: 1214 },
                { name: "Match", value: 3748 },
                { name: "Maximum", value: 843 },
                {
                    name: "methods",
                    children: [
                        { name: "add", value: 593 },
                        { name: "and", value: 330 },
                        { name: "average", value: 287 },
                        { name: "count", value: 277 },
                        { name: "distinct", value: 292 },
                        { name: "div", value: 595 },
                        { name: "eq", value: 594 },
                        { name: "fn", value: 460 },
                        { name: "gt", value: 603 },
                        { name: "gte", value: 625 },
                        { name: "iff", value: 748 },
                        { name: "isa", value: 461 },
                        { name: "lt", value: 597 },
                        { name: "lte", value: 619 },
                        { name: "max", value: 283 },
                        { name: "min", value: 283 },
                        { name: "mod", value: 591 },
                        { name: "mul", value: 603 },
                        { name: "neq", value: 599 },
                        { name: "not", value: 386 },
                        { name: "or", value: 323 },
                        { name: "orderby", value: 307 },
                        { name: "range", value: 772 },
                        { name: "select", value: 296 },
                        { name: "stddev", value: 363 },
                        { name: "sub", value: 600 },
                        { name: "sum", value: 280 },
                        { name: "update", value: 307 },
                        { name: "variance", value: 335 },
                        { name: "where", value: 299 },
                        { name: "xor", value: 354 },
                        { name: "_", value: 264 }
                    ]
                },
                { name: "Minimum", value: 843 },
                { name: "Not", value: 1554 },
                { name: "Or", value: 970 },
                { name: "Query", value: 13896 },
                { name: "Range", value: 1594 },
                { name: "StringUtil", value: 4130 },
                { name: "Sum", value: 791 },
                { name: "Variable", value: 1124 },
                { name: "Variance", value: 1876 },
                { name: "Xor", value: 1101 }
            ]
        },
        {
            name: "scale",
            children: [
                { name: "IScaleMap", value: 2105 },
                { name: "LinearScale", value: 1316 },
                { name: "LogScale", value: 3151 },
                { name: "OrdinalScale", value: 3770 },
                { name: "QuantileScale", value: 2435 },
                { name: "QuantitativeScale", value: 4839 },
                { name: "RootScale", value: 1756 },
                { name: "Scale", value: 4268 },
                { name: "ScaleType", value: 1821 },
                { name: "TimeScale", value: 5833 }
            ]
        },
        {
            name: "util",
            children: [
                { name: "Arrays", value: 8258 },
                { name: "Colors", value: 10001 },
                { name: "Dates", value: 8217 },
                { name: "Displays", value: 12555 },
                { name: "Filter", value: 2324 },
                { name: "Geometry", value: 10993 },
                {
                    name: "heap",
                    children: [
                        { name: "FibonacciHeap", value: 9354 },
                        { name: "HeapNode", value: 1233 }
                    ]
                },
                { name: "IEvaluable", value: 335 },
                { name: "IPredicate", value: 383 },
                { name: "IValueProxy", value: 874 },
                {
                    name: "math",
                    children: [
                        { name: "DenseMatrix", value: 3165 },
                        { name: "IMatrix", value: 2815 },
                        { name: "SparseMatrix", value: 3366 }
                    ]
                },
                { name: "Maths", value: 17705 },
                { name: "Orientation", value: 1486 },
                {
                    name: "palette",
                    children: [
                        { name: "ColorPalette", value: 6367 },
                        { name: "Palette", value: 1229 },
                        { name: "ShapePalette", value: 2059 },
                        { name: "SizePalette", value: 2291 }
                    ]
                },
                { name: "Property", value: 5559 },
                { name: "Shapes", value: 19118 },
                { name: "Sort", value: 6887 },
                { name: "Stats", value: 6557 },
                { name: "Strings", value: 22026 }
            ]
        },
        {
            name: "AMZN",
            children: [
                {
                    name: "axis",
                    children: [
                        { name: "Axes", value: 1302 },
                        { name: "Axis", value: 24593 },
                        { name: "AxisGridLine", value: 652 },
                        { name: "AxisLabel", value: 636 },
                        { name: "CartesianAxes", value: 6703 }
                    ]
                },
                {
                    name: "controls",
                    children: [
                        { name: "AnchorControl", value: 2138 },
                        { name: "ClickControl", value: 3824 },
                        { name: "Control", value: 1353 },
                        { name: "ControlList", value: 4665 },
                        { name: "DragControl", value: 2649 },
                        { name: "ExpandControl", value: 2832 },
                        { name: "HoverControl", value: 4896 },
                        { name: "IControl", value: 763 },
                        { name: "PanZoomControl", value: 5222 },
                        { name: "SelectionControl", value: 7862 },
                        { name: "TooltipControl", value: 8435 }
                    ]
                },
                {
                    name: "data",
                    children: [
                        { name: "Data", value: 20544 },
                        { name: "DataList", value: 19788 },
                        { name: "DataSprite", value: 10349 },
                        { name: "EdgeSprite", value: 3301 },
                        { name: "NodeSprite", value: 19382 },
                        {
                            name: "render",
                            children: [
                                { name: "ArrowType", value: 698 },
                                { name: "EdgeRenderer", value: 5569 },
                                { name: "IRenderer", value: 353 },
                                { name: "ShapeRenderer", value: 2247 }
                            ]
                        },
                        { name: "ScaleBinding", value: 11275 },
                        { name: "Tree", value: 7147 },
                        { name: "TreeBuilder", value: 9930 }
                    ]
                },
                {
                    name: "events",
                    children: [
                        { name: "DataEvent", value: 2313 },
                        { name: "SelectionEvent", value: 1880 },
                        { name: "TooltipEvent", value: 1701 },
                        { name: "VisualizationEvent", value: 1117 }
                    ]
                },
                {
                    name: "legend",
                    children: [
                        { name: "Legend", value: 20859 },
                        { name: "LegendItem", value: 4614 },
                        { name: "LegendRange", value: 10530 }
                    ]
                },
                {
                    name: "operator",
                    children: [
                        {
                            name: "distortion",
                            children: [
                                { name: "BifocalDistortion", value: 4461 },
                                { name: "Distortion", value: 6314 },
                                { name: "FisheyeDistortion", value: 3444 }
                            ]
                        },
                        {
                            name: "encoder",
                            children: [
                                { name: "ColorEncoder", value: 3179 },
                                { name: "Encoder", value: 4060 },
                                { name: "PropertyEncoder", value: 4138 },
                                { name: "ShapeEncoder", value: 1690 },
                                { name: "SizeEncoder", value: 1830 }
                            ]
                        },
                        {
                            name: "filter",
                            children: [
                                { name: "FisheyeTreeFilter", value: 5219 },
                                { name: "GraphDistanceFilter", value: 3165 },
                                { name: "VisibilityFilter", value: 3509 }
                            ]
                        },
                        { name: "IOperator", value: 1286 },
                        {
                            name: "label",
                            children: [
                                { name: "Labeler", value: 9956 },
                                { name: "RadialLabeler", value: 3899 },
                                { name: "StackedAreaLabeler", value: 3202 }
                            ]
                        },
                        {
                            name: "layout",
                            children: [
                                { name: "AxisLayout", value: 6725 },
                                { name: "BundledEdgeRouter", value: 3727 },
                                { name: "CircleLayout", value: 9317 },
                                { name: "CirclePackingLayout", value: 12003 },
                                { name: "DendrogramLayout", value: 4853 },
                                { name: "ForceDirectedLayout", value: 8411 },
                                { name: "IcicleTreeLayout", value: 4864 },
                                { name: "IndentedTreeLayout", value: 3174 },
                                { name: "Layout", value: 7881 },
                                { name: "NodeLinkTreeLayout", value: 12870 },
                                { name: "PieLayout", value: 2728 },
                                { name: "RadialTreeLayout", value: 12348 },
                                { name: "RandomLayout", value: 870 },
                                { name: "StackedAreaLayout", value: 9121 },
                                { name: "TreeMapLayout", value: 9191 }
                            ]
                        },
                        { name: "Operator", value: 2490 },
                        { name: "OperatorList", value: 5248 },
                        { name: "OperatorSequence", value: 4190 },
                        { name: "OperatorSwitch", value: 2581 },
                        { name: "SortOperator", value: 2023 }
                    ]
                },
                { name: "Visualization", value: 16540 }
            ]
        },
        {
            name: "analytics",
            children: [
                {
                    name: "cluster",
                    children: [
                        { name: "AgglomerativeCluster", value: 3938 },
                        { name: "CommunityStructure", value: 3812 },
                        { name: "HierarchicalCluster", value: 6714 },
                        { name: "MergeEdge", value: 743 }
                    ]
                },
                {
                    name: "graph",
                    children: [
                        { name: "BetweennessCentrality", value: 3534 },
                        { name: "LinkDistance", value: 5731 },
                        { name: "MaxFlowMinCut", value: 7840 },
                        { name: "ShortestPaths", value: 5914 },
                        { name: "SpanningTree", value: 3416 }
                    ]
                },
                {
                    name: "optimization",
                    children: [{ name: "AspectRatioBanker", value: 7074 }]
                }
            ]
        },
        {
            name: "animate",
            children: [
                { name: "Easing", value: 17010 },
                { name: "FunctionSequence", value: 5842 },
                {
                    name: "interpolate",
                    children: [
                        { name: "ArrayInterpolator", value: 1983 },
                        { name: "ColorInterpolator", value: 2047 },
                        { name: "DateInterpolator", value: 1375 },
                        { name: "Interpolator", value: 8746 },
                        { name: "MatrixInterpolator", value: 2202 },
                        { name: "NumberInterpolator", value: 1382 },
                        { name: "ObjectInterpolator", value: 1629 },
                        { name: "PointInterpolator", value: 1675 },
                        { name: "RectangleInterpolator", value: 2042 }
                    ]
                },
                { name: "ISchedulable", value: 1041 },
                { name: "Parallel", value: 5176 },
                { name: "Pause", value: 449 },
                { name: "Scheduler", value: 5593 },
                { name: "Sequence", value: 5534 },
                { name: "Transition", value: 9201 },
                { name: "Transitioner", value: 19975 },
                { name: "TransitionEvent", value: 1116 },
                { name: "Tween", value: 6006 }
            ]
        },
        {
            name: "data",
            children: [
                {
                    name: "converters",
                    children: [
                        { name: "Converters", value: 721 },
                        { name: "DelimitedTextConverter", value: 4294 },
                        { name: "GraphMLConverter", value: 9800 },
                        { name: "IDataConverter", value: 1314 },
                        { name: "JSONConverter", value: 2220 }
                    ]
                },
                { name: "DataField", value: 1759 },
                { name: "DataSchema", value: 2165 },
                { name: "DataSet", value: 586 },
                { name: "DataSource", value: 3331 },
                { name: "DataTable", value: 772 },
                { name: "DataUtil", value: 3322 }
            ]
        },
        {
            name: "display",
            children: [
                { name: "DirtySprite", value: 8833 },
                { name: "LineSprite", value: 1732 },
                { name: "RectSprite", value: 3623 },
                { name: "TextSprite", value: 10066 }
            ]
        },
        {
            name: "flex",
            children: [{ name: "FlareVis", value: 4116 }]
        },
        {
            name: "physics",
            children: [
                { name: "DragForce", value: 1082 },
                { name: "GravityForce", value: 1336 },
                { name: "IForce", value: 319 },
                { name: "NBodyForce", value: 10498 },
                { name: "Particle", value: 2822 },
                { name: "Simulation", value: 9983 },
                { name: "Spring", value: 2213 },
                { name: "SpringForce", value: 1681 }
            ]
        },
        {
            name: "query",
            children: [
                { name: "AggregateExpression", value: 1616 },
                { name: "And", value: 1027 },
                { name: "Arithmetic", value: 3891 },
                { name: "Average", value: 891 },
                { name: "BinaryExpression", value: 2893 },
                { name: "Comparison", value: 5103 },
                { name: "CompositeExpression", value: 3677 },
                { name: "Count", value: 781 },
                { name: "DateUtil", value: 4141 },
                { name: "Distinct", value: 933 },
                { name: "Expression", value: 5130 },
                { name: "ExpressionIterator", value: 3617 },
                { name: "Fn", value: 3240 },
                { name: "If", value: 2732 },
                { name: "IsA", value: 2039 },
                { name: "Literal", value: 1214 },
                { name: "Match", value: 3748 },
                { name: "Maximum", value: 843 },
                {
                    name: "methods",
                    children: [
                        { name: "add", value: 593 },
                        { name: "and", value: 330 },
                        { name: "average", value: 287 },
                        { name: "count", value: 277 },
                        { name: "distinct", value: 292 },
                        { name: "div", value: 595 },
                        { name: "eq", value: 594 },
                        { name: "fn", value: 460 },
                        { name: "gt", value: 603 },
                        { name: "gte", value: 625 },
                        { name: "iff", value: 748 },
                        { name: "isa", value: 461 },
                        { name: "lt", value: 597 },
                        { name: "lte", value: 619 },
                        { name: "max", value: 283 },
                        { name: "min", value: 283 },
                        { name: "mod", value: 591 },
                        { name: "mul", value: 603 },
                        { name: "neq", value: 599 },
                        { name: "not", value: 386 },
                        { name: "or", value: 323 },
                        { name: "orderby", value: 307 },
                        { name: "range", value: 772 },
                        { name: "select", value: 296 },
                        { name: "stddev", value: 363 },
                        { name: "sub", value: 600 },
                        { name: "sum", value: 280 },
                        { name: "update", value: 307 },
                        { name: "variance", value: 335 },
                        { name: "where", value: 299 },
                        { name: "xor", value: 354 },
                        { name: "_", value: 264 }
                    ]
                },
                { name: "Minimum", value: 843 },
                { name: "Not", value: 1554 },
                { name: "Or", value: 970 },
                { name: "Query", value: 13896 },
                { name: "Range", value: 1594 },
                { name: "StringUtil", value: 4130 },
                { name: "Sum", value: 791 },
                { name: "Variable", value: 1124 },
                { name: "Variance", value: 1876 },
                { name: "Xor", value: 1101 }
            ]
        },
        {
            name: "scale",
            children: [
                { name: "IScaleMap", value: 2105 },
                { name: "LinearScale", value: 1316 },
                { name: "LogScale", value: 3151 },
                { name: "OrdinalScale", value: 3770 },
                { name: "QuantileScale", value: 2435 },
                { name: "QuantitativeScale", value: 4839 },
                { name: "RootScale", value: 1756 },
                { name: "Scale", value: 4268 },
                { name: "ScaleType", value: 1821 },
                { name: "TimeScale", value: 5833 }
            ]
        },
        {
            name: "util",
            children: [
                { name: "Arrays", value: 8258 },
                { name: "Colors", value: 10001 },
                { name: "Dates", value: 8217 },
                { name: "Displays", value: 12555 },
                { name: "Filter", value: 2324 },
                { name: "Geometry", value: 10993 },
                {
                    name: "heap",
                    children: [
                        { name: "FibonacciHeap", value: 9354 },
                        { name: "HeapNode", value: 1233 }
                    ]
                },
                { name: "IEvaluable", value: 335 },
                { name: "IPredicate", value: 383 },
                { name: "IValueProxy", value: 874 },
                {
                    name: "math",
                    children: [
                        { name: "DenseMatrix", value: 3165 },
                        { name: "IMatrix", value: 2815 },
                        { name: "SparseMatrix", value: 3366 }
                    ]
                },
                { name: "Maths", value: 17705 },
                { name: "Orientation", value: 1486 },
                {
                    name: "palette",
                    children: [
                        { name: "ColorPalette", value: 6367 },
                        { name: "Palette", value: 1229 },
                        { name: "ShapePalette", value: 2059 },
                        { name: "SizePalette", value: 2291 }
                    ]
                },
                { name: "Property", value: 5559 },
                { name: "Shapes", value: 19118 },
                { name: "Sort", value: 6887 },
                { name: "Stats", value: 6557 },
                { name: "Strings", value: 22026 }
            ]
        },
        {
            name: "GOOG",
            children: [
                {
                    name: "axis",
                    children: [
                        { name: "Axes", value: 1302 },
                        { name: "Axis", value: 24593 },
                        { name: "AxisGridLine", value: 652 },
                        { name: "AxisLabel", value: 636 },
                        { name: "CartesianAxes", value: 6703 }
                    ]
                },
                {
                    name: "controls",
                    children: [
                        { name: "AnchorControl", value: 2138 },
                        { name: "ClickControl", value: 3824 },
                        { name: "Control", value: 1353 },
                        { name: "ControlList", value: 4665 },
                        { name: "DragControl", value: 2649 },
                        { name: "ExpandControl", value: 2832 },
                        { name: "HoverControl", value: 4896 },
                        { name: "IControl", value: 763 },
                        { name: "PanZoomControl", value: 5222 },
                        { name: "SelectionControl", value: 7862 },
                        { name: "TooltipControl", value: 8435 }
                    ]
                },
                {
                    name: "data",
                    children: [
                        { name: "Data", value: 20544 },
                        { name: "DataList", value: 19788 },
                        { name: "DataSprite", value: 10349 },
                        { name: "EdgeSprite", value: 3301 },
                        { name: "NodeSprite", value: 19382 },
                        {
                            name: "render",
                            children: [
                                { name: "ArrowType", value: 698 },
                                { name: "EdgeRenderer", value: 5569 },
                                { name: "IRenderer", value: 353 },
                                { name: "ShapeRenderer", value: 2247 }
                            ]
                        },
                        { name: "ScaleBinding", value: 11275 },
                        { name: "Tree", value: 7147 },
                        { name: "TreeBuilder", value: 9930 }
                    ]
                },
                {
                    name: "events",
                    children: [
                        { name: "DataEvent", value: 2313 },
                        { name: "SelectionEvent", value: 1880 },
                        { name: "TooltipEvent", value: 1701 },
                        { name: "VisualizationEvent", value: 1117 }
                    ]
                },
                {
                    name: "legend",
                    children: [
                        { name: "Legend", value: 20859 },
                        { name: "LegendItem", value: 4614 },
                        { name: "LegendRange", value: 10530 }
                    ]
                },
                {
                    name: "operator",
                    children: [
                        {
                            name: "distortion",
                            children: [
                                { name: "BifocalDistortion", value: 4461 },
                                { name: "Distortion", value: 6314 },
                                { name: "FisheyeDistortion", value: 3444 }
                            ]
                        },
                        {
                            name: "encoder",
                            children: [
                                { name: "ColorEncoder", value: 3179 },
                                { name: "Encoder", value: 4060 },
                                { name: "PropertyEncoder", value: 4138 },
                                { name: "ShapeEncoder", value: 1690 },
                                { name: "SizeEncoder", value: 1830 }
                            ]
                        },
                        {
                            name: "filter",
                            children: [
                                { name: "FisheyeTreeFilter", value: 5219 },
                                { name: "GraphDistanceFilter", value: 3165 },
                                { name: "VisibilityFilter", value: 3509 }
                            ]
                        },
                        { name: "IOperator", value: 1286 },
                        {
                            name: "label",
                            children: [
                                { name: "Labeler", value: 9956 },
                                { name: "RadialLabeler", value: 3899 },
                                { name: "StackedAreaLabeler", value: 3202 }
                            ]
                        },
                        {
                            name: "layout",
                            children: [
                                { name: "AxisLayout", value: 6725 },
                                { name: "BundledEdgeRouter", value: 3727 },
                                { name: "CircleLayout", value: 9317 },
                                { name: "CirclePackingLayout", value: 12003 },
                                { name: "DendrogramLayout", value: 4853 },
                                { name: "ForceDirectedLayout", value: 8411 },
                                { name: "IcicleTreeLayout", value: 4864 },
                                { name: "IndentedTreeLayout", value: 3174 },
                                { name: "Layout", value: 7881 },
                                { name: "NodeLinkTreeLayout", value: 12870 },
                                { name: "PieLayout", value: 2728 },
                                { name: "RadialTreeLayout", value: 12348 },
                                { name: "RandomLayout", value: 870 },
                                { name: "StackedAreaLayout", value: 9121 },
                                { name: "TreeMapLayout", value: 9191 }
                            ]
                        },
                        { name: "Operator", value: 2490 },
                        { name: "OperatorList", value: 5248 },
                        { name: "OperatorSequence", value: 4190 },
                        { name: "OperatorSwitch", value: 2581 },
                        { name: "SortOperator", value: 2023 }
                    ]
                },
                { name: "Visualization", value: 16540 }
            ]
        },
        {
            name: "analytics",
            children: [
                {
                    name: "cluster",
                    children: [
                        { name: "AgglomerativeCluster", value: 3938 },
                        { name: "CommunityStructure", value: 3812 },
                        { name: "HierarchicalCluster", value: 6714 },
                        { name: "MergeEdge", value: 743 }
                    ]
                },
                {
                    name: "graph",
                    children: [
                        { name: "BetweennessCentrality", value: 3534 },
                        { name: "LinkDistance", value: 5731 },
                        { name: "MaxFlowMinCut", value: 7840 },
                        { name: "ShortestPaths", value: 5914 },
                        { name: "SpanningTree", value: 3416 }
                    ]
                },
                {
                    name: "optimization",
                    children: [{ name: "AspectRatioBanker", value: 7074 }]
                }
            ]
        },
        {
            name: "animate",
            children: [
                { name: "Easing", value: 17010 },
                { name: "FunctionSequence", value: 5842 },
                {
                    name: "interpolate",
                    children: [
                        { name: "ArrayInterpolator", value: 1983 },
                        { name: "ColorInterpolator", value: 2047 },
                        { name: "DateInterpolator", value: 1375 },
                        { name: "Interpolator", value: 8746 },
                        { name: "MatrixInterpolator", value: 2202 },
                        { name: "NumberInterpolator", value: 1382 },
                        { name: "ObjectInterpolator", value: 1629 },
                        { name: "PointInterpolator", value: 1675 },
                        { name: "RectangleInterpolator", value: 2042 }
                    ]
                },
                { name: "ISchedulable", value: 1041 },
                { name: "Parallel", value: 5176 },
                { name: "Pause", value: 449 },
                { name: "Scheduler", value: 5593 },
                { name: "Sequence", value: 5534 },
                { name: "Transition", value: 9201 },
                { name: "Transitioner", value: 19975 },
                { name: "TransitionEvent", value: 1116 },
                { name: "Tween", value: 6006 }
            ]
        },
        {
            name: "data",
            children: [
                {
                    name: "converters",
                    children: [
                        { name: "Converters", value: 721 },
                        { name: "DelimitedTextConverter", value: 4294 },
                        { name: "GraphMLConverter", value: 9800 },
                        { name: "IDataConverter", value: 1314 },
                        { name: "JSONConverter", value: 2220 }
                    ]
                },
                { name: "DataField", value: 1759 },
                { name: "DataSchema", value: 2165 },
                { name: "DataSet", value: 586 },
                { name: "DataSource", value: 3331 },
                { name: "DataTable", value: 772 },
                { name: "DataUtil", value: 3322 }
            ]
        },
        {
            name: "display",
            children: [
                { name: "DirtySprite", value: 8833 },
                { name: "LineSprite", value: 1732 },
                { name: "RectSprite", value: 3623 },
                { name: "TextSprite", value: 10066 }
            ]
        },
        {
            name: "flex",
            children: [{ name: "FlareVis", value: 4116 }]
        },
        {
            name: "physics",
            children: [
                { name: "DragForce", value: 1082 },
                { name: "GravityForce", value: 1336 },
                { name: "IForce", value: 319 },
                { name: "NBodyForce", value: 10498 },
                { name: "Particle", value: 2822 },
                { name: "Simulation", value: 9983 },
                { name: "Spring", value: 2213 },
                { name: "SpringForce", value: 1681 }
            ]
        },
        {
            name: "query",
            children: [
                { name: "AggregateExpression", value: 1616 },
                { name: "And", value: 1027 },
                { name: "Arithmetic", value: 3891 },
                { name: "Average", value: 891 },
                { name: "BinaryExpression", value: 2893 },
                { name: "Comparison", value: 5103 },
                { name: "CompositeExpression", value: 3677 },
                { name: "Count", value: 781 },
                { name: "DateUtil", value: 4141 },
                { name: "Distinct", value: 933 },
                { name: "Expression", value: 5130 },
                { name: "ExpressionIterator", value: 3617 },
                { name: "Fn", value: 3240 },
                { name: "If", value: 2732 },
                { name: "IsA", value: 2039 },
                { name: "Literal", value: 1214 },
                { name: "Match", value: 3748 },
                { name: "Maximum", value: 843 },
                {
                    name: "methods",
                    children: [
                        { name: "add", value: 593 },
                        { name: "and", value: 330 },
                        { name: "average", value: 287 },
                        { name: "count", value: 277 },
                        { name: "distinct", value: 292 },
                        { name: "div", value: 595 },
                        { name: "eq", value: 594 },
                        { name: "fn", value: 460 },
                        { name: "gt", value: 603 },
                        { name: "gte", value: 625 },
                        { name: "iff", value: 748 },
                        { name: "isa", value: 461 },
                        { name: "lt", value: 597 },
                        { name: "lte", value: 619 },
                        { name: "max", value: 283 },
                        { name: "min", value: 283 },
                        { name: "mod", value: 591 },
                        { name: "mul", value: 603 },
                        { name: "neq", value: 599 },
                        { name: "not", value: 386 },
                        { name: "or", value: 323 },
                        { name: "orderby", value: 307 },
                        { name: "range", value: 772 },
                        { name: "select", value: 296 },
                        { name: "stddev", value: 363 },
                        { name: "sub", value: 600 },
                        { name: "sum", value: 280 },
                        { name: "update", value: 307 },
                        { name: "variance", value: 335 },
                        { name: "where", value: 299 },
                        { name: "xor", value: 354 },
                        { name: "_", value: 264 }
                    ]
                },
                { name: "Minimum", value: 843 },
                { name: "Not", value: 1554 },
                { name: "Or", value: 970 },
                { name: "Query", value: 13896 },
                { name: "Range", value: 1594 },
                { name: "StringUtil", value: 4130 },
                { name: "Sum", value: 791 },
                { name: "Variable", value: 1124 },
                { name: "Variance", value: 1876 },
                { name: "Xor", value: 1101 }
            ]
        },
        {
            name: "scale",
            children: [
                { name: "IScaleMap", value: 2105 },
                { name: "LinearScale", value: 1316 },
                { name: "LogScale", value: 3151 },
                { name: "OrdinalScale", value: 3770 },
                { name: "QuantileScale", value: 2435 },
                { name: "QuantitativeScale", value: 4839 },
                { name: "RootScale", value: 1756 },
                { name: "Scale", value: 4268 },
                { name: "ScaleType", value: 1821 },
                { name: "TimeScale", value: 5833 }
            ]
        },
        {
            name: "util",
            children: [
                { name: "Arrays", value: 8258 },
                { name: "Colors", value: 10001 },
                { name: "Dates", value: 8217 },
                { name: "Displays", value: 12555 },
                { name: "Filter", value: 2324 },
                { name: "Geometry", value: 10993 },
                {
                    name: "heap",
                    children: [
                        { name: "FibonacciHeap", value: 9354 },
                        { name: "HeapNode", value: 1233 }
                    ]
                },
                { name: "IEvaluable", value: 335 },
                { name: "IPredicate", value: 383 },
                { name: "IValueProxy", value: 874 },
                {
                    name: "math",
                    children: [
                        { name: "DenseMatrix", value: 3165 },
                        { name: "IMatrix", value: 2815 },
                        { name: "SparseMatrix", value: 3366 }
                    ]
                },
                { name: "Maths", value: 17705 },
                { name: "Orientation", value: 1486 },
                {
                    name: "palette",
                    children: [
                        { name: "ColorPalette", value: 6367 },
                        { name: "Palette", value: 1229 },
                        { name: "ShapePalette", value: 2059 },
                        { name: "SizePalette", value: 2291 }
                    ]
                },
                { name: "Property", value: 5559 },
                { name: "Shapes", value: 19118 },
                { name: "Sort", value: 6887 },
                { name: "Stats", value: 6557 },
                { name: "Strings", value: 22026 }
            ]
        },
        {
            name: "TSLA",
            children: [
                {
                    name: "axis",
                    children: [
                        { name: "Axes", value: 1302 },
                        { name: "Axis", value: 24593 },
                        { name: "AxisGridLine", value: 652 },
                        { name: "AxisLabel", value: 636 },
                        { name: "CartesianAxes", value: 6703 }
                    ]
                },
                {
                    name: "controls",
                    children: [
                        { name: "AnchorControl", value: 2138 },
                        { name: "ClickControl", value: 3824 },
                        { name: "Control", value: 1353 },
                        { name: "ControlList", value: 4665 },
                        { name: "DragControl", value: 2649 },
                        { name: "ExpandControl", value: 2832 },
                        { name: "HoverControl", value: 4896 },
                        { name: "IControl", value: 763 },
                        { name: "PanZoomControl", value: 5222 },
                        { name: "SelectionControl", value: 7862 },
                        { name: "TooltipControl", value: 8435 }
                    ]
                },
                {
                    name: "data",
                    children: [
                        { name: "Data", value: 20544 },
                        { name: "DataList", value: 19788 },
                        { name: "DataSprite", value: 10349 },
                        { name: "EdgeSprite", value: 3301 },
                        { name: "NodeSprite", value: 19382 },
                        {
                            name: "render",
                            children: [
                                { name: "ArrowType", value: 698 },
                                { name: "EdgeRenderer", value: 5569 },
                                { name: "IRenderer", value: 353 },
                                { name: "ShapeRenderer", value: 2247 }
                            ]
                        },
                        { name: "ScaleBinding", value: 11275 },
                        { name: "Tree", value: 7147 },
                        { name: "TreeBuilder", value: 9930 }
                    ]
                },
                {
                    name: "events",
                    children: [
                        { name: "DataEvent", value: 2313 },
                        { name: "SelectionEvent", value: 1880 },
                        { name: "TooltipEvent", value: 1701 },
                        { name: "VisualizationEvent", value: 1117 }
                    ]
                },
                {
                    name: "legend",
                    children: [
                        { name: "Legend", value: 20859 },
                        { name: "LegendItem", value: 4614 },
                        { name: "LegendRange", value: 10530 }
                    ]
                },
                {
                    name: "operator",
                    children: [
                        {
                            name: "distortion",
                            children: [
                                { name: "BifocalDistortion", value: 4461 },
                                { name: "Distortion", value: 6314 },
                                { name: "FisheyeDistortion", value: 3444 }
                            ]
                        },
                        {
                            name: "encoder",
                            children: [
                                { name: "ColorEncoder", value: 3179 },
                                { name: "Encoder", value: 4060 },
                                { name: "PropertyEncoder", value: 4138 },
                                { name: "ShapeEncoder", value: 1690 },
                                { name: "SizeEncoder", value: 1830 }
                            ]
                        },
                        {
                            name: "filter",
                            children: [
                                { name: "FisheyeTreeFilter", value: 5219 },
                                { name: "GraphDistanceFilter", value: 3165 },
                                { name: "VisibilityFilter", value: 3509 }
                            ]
                        },
                        { name: "IOperator", value: 1286 },
                        {
                            name: "label",
                            children: [
                                { name: "Labeler", value: 9956 },
                                { name: "RadialLabeler", value: 3899 },
                                { name: "StackedAreaLabeler", value: 3202 }
                            ]
                        },
                        {
                            name: "layout",
                            children: [
                                { name: "AxisLayout", value: 6725 },
                                { name: "BundledEdgeRouter", value: 3727 },
                                { name: "CircleLayout", value: 9317 },
                                { name: "CirclePackingLayout", value: 12003 },
                                { name: "DendrogramLayout", value: 4853 },
                                { name: "ForceDirectedLayout", value: 8411 },
                                { name: "IcicleTreeLayout", value: 4864 },
                                { name: "IndentedTreeLayout", value: 3174 },
                                { name: "Layout", value: 7881 },
                                { name: "NodeLinkTreeLayout", value: 12870 },
                                { name: "PieLayout", value: 2728 },
                                { name: "RadialTreeLayout", value: 12348 },
                                { name: "RandomLayout", value: 870 },
                                { name: "StackedAreaLayout", value: 9121 },
                                { name: "TreeMapLayout", value: 9191 }
                            ]
                        },
                        { name: "Operator", value: 2490 },
                        { name: "OperatorList", value: 5248 },
                        { name: "OperatorSequence", value: 4190 },
                        { name: "OperatorSwitch", value: 2581 },
                        { name: "SortOperator", value: 2023 }
                    ]
                },
                { name: "Visualization", value: 16540 }
            ]
        }
    ]
};