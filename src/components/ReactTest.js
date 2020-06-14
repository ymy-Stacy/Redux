import React, { Component } from 'react';

class Todo extends Component {
    render() {
        // console.log('key---', this.props.key); // 是undefined,react规定key和ref是react保留的两个特殊prop,并不打算让组件直接访问
        return (
            <div>
                {this.props.text}
            </div>
        )
    }
}
class Change extends Component {
    constructor(){
        super();
        this.state = {
            a: 0,
        }
    }
    getInitialState(){
        this.setState({a: 12});
    }
    // getDefaultProps() {
    //     this.setState({a: 11});
    // }
    // static property
    componentWillMount(){
        this.setState({a: 1});
        console.log('Change-componentWillMount---');
    }
    componentDidMount(){
        this.setState({a: 2});

        console.log('Change-componentDidMount---');
    }
    componentWillReceiveProps(nextState, nextProps) {
        this.setState({a: 3});

        console.log('Change-nextState---',nextState);
        console.log('Change-nextProps---',nextProps);
        console.log('Change-componentWillReceiveProps---');
    }
    shouldComponentUpdate() {
        // this.setState({a: 4});

        console.log('Change-shouldComponentUpdate---');
        return true;
    }
    componentWillUpdate(){
        // this.setState({a: 5});

        console.log('Change-componentWillUpdate---');
    }
    componentDidUpdate(){
        // this.setState({a: 6});

        console.log('Change-componentDidUpdate---');
    }
    componentWillUnmount() {
        this.setState({a: 7});

        console.log('Change-componentWillUnmount---');
    }
    render() {
        console.log('Change-render---');

        return (
            <div>
                {this.props.text}
            </div>
        )
    }
}
export default class Test extends Component {
    constructor (props) {
        super(props);
        this.state = {
            number: 0,
            initil: 100,
            ruleNumber: 0,
            changeItems:[
                {num: 777, index: 8},
                {num: 888, index: 9},
            ]
        }
        this.buttonClick = this.buttonClick.bind(this);
        this.testPromiseRace = this.testPromiseRace.bind(this);
        this.ruleClick = this.ruleClick.bind(this);
        this.updateCount = this.updateCount.bind(this);
        this.changeClick = this.changeClick.bind(this);
        this.inputValue = '';
    }
    componentDidMount() {
        this.testPromiseRace();
    }
    testPromiseRace(){
        const a1 = new Promise((reslove,reject)=>{
            setTimeout(()=>{
                reslove(2000)
            },2000)
        })
        const a2 = new Promise((reslove,reject)=>{
            setTimeout(()=>{
                reslove(1000)
            },1000)
        })
        const a3 = new Promise((reslove,reject)=>{
            setTimeout(()=>{
                reject(3000)
            },3000)
        })
        // Promise.race([a1, a2 ,a3])
        //     .then((reslove,aa)=>{
        //         console.log('rece返回的成功reslove', reslove);
        //         console.log('aa', aa); // undefined 注意没有第二个参数噢

        //     },(reject,bb)=>{
        //         console.log('rece返回的失败reject', reject);
        //         console.log('bb', bb); // undefined 注意没有第二个参数噢
        //     })

        Promise.all([a1, a2 ,a3])
            .then((reslove)=>{
                // 三个都成功就都返回
                console.log('all返回的成功reslove', reslove);// [2000, 1000, 3000]
            },(reject)=>{
                // 有一个失败就返回失败的那个，哪怕他是最后一个输出的
                console.log('all返回的失败reject', reject); // 3000
            })
            .catch(a=>{ //注意catch的函数，只有一个参数 // 当上面的reject函数没有写的时候，下面的catch才会走
                console.log('a', a);
            })
            // catch相当于.then(null,(reject)=>{})或者.then(undefined, (reject)=>{})
            // 另外，then方法里面指定的回调函数，运行过程中发生错误，也会被catch捕获
            // 建议总是使用catch方法，而不使用then方法的第二个参数。因为catch()可以捕获前面的then的参数，
            // 即第一个回调的错误
    }
    // static property(props) {
    //     this.props={
    //         lucky: 20
    //     }
    // }

    
    buttonClick() {
        // const {number} = this.state;
        // console.log('初始的', number); // 0
        // this.setState({
        //     number: number+1,
        // },()=>{
        //     console.log('第二个回调函数,注意上面的括号里是没有东西的', this.state.number); // 1
        // })
        // console.log('结束的', number); // 0
        // 上面的代码说明setState是异步执行

        const {number} = this.state;
        console.log('初始的', number); // 0
        this.setState((prevState,prevProps)=>{
            console.log('setState里第一个回调函数的第一个参数:当前的state', prevState); // {number: 0, initil}
            console.log('setState里第一个回调函数的第二个参数:当前的props', prevProps);
            return {
                number: prevState.number + 10,
                textProps: prevProps.textProps + 20, // 注意这一步就是给当前组件新增了一个state,叫做textProps
            }
        },()=>{
            // 注意。第二个回调函数也和setState一样，没有参数
            // 它和setState传递对象的方法一样，都只是异步的一个回调而已，这个里面可以得到
            // 更新后的state和props
            console.log('回调函数里的state', this.state.number); 
            console.log('回调函数里的props', this.props.textProps); // 这个值不会因为上面操作而变化
        })
        console.log('结束的', number); // 这里还是 0 注意就算传递的是一个函数，也不会在setState之后得到新的state值
    }

    ruleClick() {
    // setTimeout(()=>{ // 说明在setTimeout里面state是同步的，传递对象的时候也可以批量更新
        this.setState(this.updateCount());
        this.setState(this.updateCount());
        this.setState(this.updateCount());
        this.setState(this.updateCount());
        this.setState(this.updateCount());
    // })
    }
    updateCount(){
    //    return  (preState,preProps)=>{
    //         return {
    //            ruleNumber: preState.ruleNumber + 1,
    //         }
    //     }
        const {ruleNumber} = this.state;
        return {
            ruleNumber: ruleNumber+1,
        }
    }

    changeClick = () => {
        this.setState({
            changeItems: [
                {num: 888, index: 9},
                {num: 777, index: 8},
            ]
        })
    }
    render() {
        const {number, ruleNumber} = this.state;
        const {textProps} = this.props;
        console.log('--------------执行了render方法')
        console.log('--------------',this.inputValue.value)

        return (
            <div>
                <div>
                    {/* 测试setState的参数传参方式 */}
                    <button onClick={this.buttonClick}>点我吧（测试State的传参方式）</button>
                    <span>{number}</span> /
                    <span>{textProps}</span>
                </div>
                <div>
                    {/* 测试setState的参数的渲染规则 */}
                    <button onClick={this.ruleClick}>点我吧（测试State的传参渲染规则）</button>
                    <span>{ruleNumber}</span> 
                </div>
                {[{index:1,item:333},{index:2,item:333},{index:3,item:333}].map(item=>{
                   return <Todo
                    key = {item.index}
                    text = {item.item}
                    >
                    </Todo>
                })}
                {this.state.changeItems.map((item)=>{
                   return <Change
                    key = {item.index}
                    text = {item.num}
                    >
                    </Change>
                })}
                <button onClick={this.changeClick}>点我查看有key的item互换是什么样子的</button>

                <input ref={val=>this.inputValue = val}></input>
                <div>{this.inputValue.value}</div>
            </div>

        )
    }
}
