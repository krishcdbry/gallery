import React from 'react';
import { render } from 'react-dom';
import GalleryItem from './GalleryItem'

require('./app.scss');

class App extends React.Component {
    
    constructor() {
        super();

        const imageList = [
            {
             'caption' : 'Office pic 1',
              'src' : 'https://officepictures.files.wordpress.com/2011/08/google-office-scott-brownrigg1.jpg' 
            },
            {
                'caption' : 'Office pic 2',
                 'src' :   'http://cdn.home-designing.com/wp-content/uploads/2013/01/google-office-pictures.jpeg' 
            },
            {
                'caption' : 'Office pic 3',
                 'src' : 'https://userscontent2.emaze.com/images/3d73d355-6113-45f2-8889-a3dab29e0a3b/be9b1806b7a4f31803ffc26b3b3b7334.jpg'
            },
            {
                'caption' : 'Office pic 4',
                 'src' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmX7oL3f1JSqmCPfvoqwaYriZ2DYcsrsjKN22PENDwvbsMzcSA',
            },
            {
                'caption' : 'Office pic 5',
                 'src' : 'http://st1.bgr.in/wp-content/uploads/2014/10/android-lollipop-statue.jpg'
             },
            {
                'caption' : 'Office pic 6',
                'src' :   'https://www.actusmedias.com/wp-content/uploads/2018/04/google-hq-2016.jpg'
            },
            {
                'caption' : 'Office pic 7',
                'src' : 'https://www.mercurynews.com/wp-content/uploads/2017/06/dub.jpg?w=620'
            },
            {
                'caption' : 'Office pic 8',
                'src' :   'http://freenancenow.com/wp-content/uploads/2018/02/l1_v354878_958_992_744-1.jpg'
            }
          ]

          this.state = {
            imageList,
            openImage_idx : -1,
            wrapperStyle : null
          }
    }

    loadNext() {
        console.log("Loading next");
        if (this.state.openImage_idx < 0) {
            return;
        }
        let nextIdx = this.state.openImage_idx+1;

        console.log(nextIdx, this.state.imageList.length);
        if (nextIdx < this.state.imageList.length) {
            this.setState({
                openImage_idx : nextIdx,
            })
        }
    }

    loadPrev() {
        if (this.state.openImage_idx < 0) {
            return;
        }
        let nextIdx = this.state.openImage_idx-1;
        if (nextIdx >= 0) {
            this.setState({
                openImage_idx : nextIdx,
            })
        }
    }

    componentDidMount() {
        let lastMove = 0;
        let startMove = 0;
        let activeImage = null;
        let _handleStart = (e) => {
            activeImage = document.getElementById('activeImg');
            startMove = e.touches[0];
            console.log("Starting");
        }

        let _handleEnd = (e) => {
            console.log(lastMove);
            console.log(startMove);
            console.log("Ending");
            activeImage.style.transform = 'translate(0%, -50%)';
            let startX = startMove.clientX,
                endX = lastMove.clientX;
            let moveDiff = Math.abs(startX-endX);
            if (moveDiff > window.innerWidth/1.7) {
                if (startX > endX) {
                    this.loadNext()
                }
                else {
                    this.loadPrev()
                }
            }
        }

        // let _handleCancel = (e) => {
        //     console.log(e);
        //     console.log(e.touches);
        //     console.log("Cancel");
        // }

        let _handleMove = (e) => {
            lastMove = e.touches[0];
            if (this.state.openImage_idx > -1) {
                let startX = startMove.clientX,
                endX = lastMove.clientX;
                let x = Math.floor(lastMove.clientX/window.innerHeight);
                console.log("Moving", x);
                if (startX > endX) {
                    activeImage.style.transform = 'translateX(-'+x+'px)';
                }
                else {
                    activeImage.style.transform = 'translateX('+x+'px)';
                }
               
            }
            console.log("Move");
        }

        document.body.addEventListener("touchstart", _handleStart, false);
        document.body.addEventListener("touchend", _handleEnd.bind(this), false);
        //document.body.addEventListener("touchcancel", _handleCancel.bind(this), false);
        document.body.addEventListener("touchmove", _handleMove.bind(this), false);
    }

    openImage(idx) {
        if (idx == this.state.openImage_idx) {
            return;
        }
        this.setState({
            openImage_idx : idx,
            wrapperStyle : {  
                'height' : '100%',
                'width' : '100%',
            }
        })
    }

    closeWrapper() {
        this.setState({
            openImage_idx : -1,
            wrapperStyle : {  
                'height' : '0%',
                'width' : '0%',
                'transform' : 'scale(0)'
            }
        })
    }

    applyTransition(style) {
        if (this.state.wrapperStyle.transform == style.transform) {
            console.log("returned");
            return;
        }
        let imageStyle = Object.assign({}, this.state.wrapperStyle, style);
        setTimeout(() => {
            this.setState({
                wrapperStyle: imageStyle
            })
        }, 500);
    }

    render() {
    
      let caption = null;
      let src = null;

      let imageComponent = this.state.imageList.map((item, idx) => {
            return <div className="gallery-item" key={idx} onClick={() => this.openImage(idx)}>
                    <GalleryItem src={item.src}/>
            </div>
      });

      if (this.state.openImage_idx > -1) {
        caption = this.state.imageList[this.state.openImage_idx].caption,
        src = this.state.imageList[this.state.openImage_idx].src
        let style = {
            'transform' : 'scale(1)',
        }
        this.applyTransition(style)
      }

      return (
        <div className="App">
          <div className="App-header">
            <h1>Image Gallery</h1>
          </div>

          <div className="App-body">
            <div className="section section-one">
                {imageComponent}
            </div>
          </div>
          <div class="popup-wrapper" style={this.state.wrapperStyle}>   
                <div class="wrapper-header">
                    {caption}
                </div>
                <div class="close" onClick={this.closeWrapper.bind(this)}>
                    X
                </div>
                <div class="content-scroll">
                
                    <img id="activeImg" src={src}/>
                 
                </div>
                <div class="options">
                    <div class="option-item"></div>
                    <div class="option-item"></div>
                    <div class="option-item"></div>
                    <div class="option-item"></div>
                    <div class="option-item"></div>
                </div>
           </div>
        </div>
      );
    }
  }
  export default App;
  
  render(
      <App/>, document.getElementById('root')
  )