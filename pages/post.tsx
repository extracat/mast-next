import api from '../lib/api'
import Head from 'next/head'
import TelegramComponent from '../components/Telegram'
import Layout from '../components/layout';
import { Telegram } from '../interfaces'
import Link from 'next/link'
import { FormEvent } from 'react'
import Router from 'next/router'
import { useEffect } from 'react'

export async function getServerSideProps(context) {
    const data = JSON.stringify(api)
    return {
      props: { data }, // will be passed to the page component as props
    }
}


export default function PostNewTelegram({ data }) {
  // Handle the submit event on form submit.
  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Cast the event target to an html form
    const form = event.target as HTMLFormElement

    // Get data from the form.
    const formData = {
      title: (form.title as unknown as HTMLTextAreaElement).value,
      body: (form.body as unknown as HTMLInputElement).value,
    }

    const api = JSON.parse(data)

    // Send the form data to our API and get a response.
    const response = await fetch(api.telegram, {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(formData),
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'POST',
    })

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()

    Router.push("/");

  }
  return (
    <Layout>
      <h1>Post new telegram</h1>
      
      <form onSubmit={handleSubmit}>
        <div><label htmlFor="title">Title</label></div>
        <div><input type="text" id="title" name="title" required /></div>
        <div><label htmlFor="body">Body</label></div>
        <div><textarea id="body" name="body" required /></div>
        <div><button type="submit">Submit</button></div>
      </form>
    </Layout>
  )
}
