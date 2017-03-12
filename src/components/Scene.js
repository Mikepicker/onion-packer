import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import pathlib from 'path';

export default class Scene extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 2);
    this.directionalLightPosition = new THREE.Vector3(0, 0, 1);
    this.scenePosition = new THREE.Vector3(0, 0, 0);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.01,
          this.state.cubeRotation.y + 0.001,
          0
        ),
      });
    };
  }

  scrollHandler = (e) => {
    e.preventDefault();
  }

  componentDidMount = () => {
    window.onwheel = this.scrollHandler;
  }

  componentWillUnmount = () => {
    window.onwheel = null;
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight-40; // canvas height


    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={this._onAnimate}>

        <resources>
          <texture
            resourceId="texture"
            url={pathlib.join(this.props.texture.basepath, this.props.texture.path)}
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
            anisotropy={16}
            repeat={new THREE.Vector2(4, 4)}
          />
          <meshLambertMaterial
            resourceId="material"
            side={THREE.DoubleSide}
          >
            <textureResource
              resourceId="texture"
            />
          </meshLambertMaterial>
        </resources>

        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}

            position={this.cameraPosition}/>

          <ambientLight
            color={0x222222}
          />

          <directionalLight
            color={0xffffff}
            position={this.directionalLightPosition}
            lookAt={this.scenePosition}
          />

          <mesh rotation={this.state.cubeRotation}>
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
        </scene>
      </React3>);
  }
}
