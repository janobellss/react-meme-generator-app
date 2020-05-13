import React from 'react';

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //console.log("COMPONENT DID MOUNT");

        this.setState({isLoading: true});
        
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data;

            this.setState({
                isLoading: false,
                allMemeImgs: memes
            });

            //console.log(response);
            //console.log(memes);
            //console.log(memes[0]);
            //console.log(memes[0].url);

            //console.log(this.state.allMemeImgs[99].url);
        })
    }

    handleChange(event) {
        const {name, value} = event.target;

        // console.log("NAME: " + name);
        // console.log("VALUE: " + value);

        this.setState({
            [name]: value
        });

        // const allMemeImgsLength = this.state.allMemeImgs.length;
        // let randomNum = Math.floor(Math.random() * allMemeImgsLength);

        // console.log("ALL MEME IMAGES LENGTH: " + allMemeImgsLength);
        // console.log("RANDOM NUMBER: " + randomNum);

        // this.setState({
        //     randomImg: this.state.allMemeImgs[randomNum].url
        // });

        // console.log("RANDOM IMAGE NOW: " + this.state.randomImg);
    }

    handleSubmit(event) {
        //console.log("SUBMIT!");
        event.preventDefault();

        const allMemeImgsLength = this.state.allMemeImgs.length;
        let randomNum = Math.floor(Math.random() * allMemeImgsLength);
        let randomMemeImg = this.state.allMemeImgs[randomNum].url;

        this.setState({
             randomImg: randomMemeImg
        });
    }

    render() {

        return(
            <div>
                <form className='meme-form' onSubmit={this.handleSubmit}>
                    <input 
                        type='text' 
                        name='topText' 
                        value={this.state.topText} 
                        placeholder='Your Top Text Here' 
                        onChange={this.handleChange}
                    />

                    <input 
                        type='text' 
                        name='bottomText' 
                        value={this.state.bottomText} 
                        placeholder='Your Bottom Text Here' 
                        onChange={this.handleChange}
                    />

                    <button>Gen</button>
                </form>

                <div className='meme'>
                    <img src={this.state.randomImg} alt='' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;