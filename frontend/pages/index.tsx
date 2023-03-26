import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
    return (
        <main className="flex flex-col justify-center h-screen m-2">
            <h1 className="text-5xl font-sans font-bold">Story Blitz</h1>
            <h2>Learn through story telling.</h2>
            <input className=" mt-3 p-2" placeholder="Find a study topic..."></input>
        </main>
    )
}

export default Home
