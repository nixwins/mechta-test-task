<template>
  <div class="animated-loader">
    <svg viewBox="0 0 300 300">
      <text x="50%" y="50%" dy=".35em" text-anchor="middle">FastService</text>
    </svg>
  </div>
</template>

<style lang="scss">
.animated-loader {
  // width: 100vw;
  height: 100vh;
  // overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  svg {
    font-family: 'Russo One', sans-serif;
    align-self: center;
  }
  svg text {
    text-transform: uppercase;
    animation: stroke 1.5s infinite alternate;
    stroke-width: 2;
    stroke: #365fa0;
    font-size: 40px;
  }
}

@keyframes stroke {
  0% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(54, 95, 160, 1);
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 2;
  }
  70% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(54, 95, 160, 1);
  }
  80% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(54, 95, 160, 1);
    stroke-width: 3;
  }
  100% {
    fill: rgba(72, 138, 204, 1);
    stroke: rgba(54, 95, 160, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;
  }
}
</style>
