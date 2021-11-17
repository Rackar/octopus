<template>
  <div>
    <h3 class="">TOKEN:</h3>
    <div>Buy OCT</div>
    <h3 class="mt-6">NFT:</h3>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <figure
        class="mt-8 md:flex rounded-xl p-8 md:p-0"
        v-for="i in 4"
        :key="i"
      >
        <img
          class="md:rounded-none rounded-full"
          src="/img/octopus.jpg"
          alt=""
          width="400"
          height="300"
        />
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p class="text-lg font-semibold">name: 2021.11.11 08:00:00</p>
          </blockquote>
          <figcaption class="font-medium">
            <div>Owner: 0xsdfio...sdfso</div>
            <div>Price: 1E</div>
            <div>BUY</div>
          </figcaption>
        </div>
      </figure>
    </div>
  </div>
</template>
