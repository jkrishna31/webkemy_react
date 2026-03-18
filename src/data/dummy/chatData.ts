export const groupDetails = {
  name: "Help",
  profile: "https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnRvb24lMjBwcm9maWxlfGVufDB8fDB8fHww",
  members: 12,
  description: "",
};

export const dummyChats = [
  {
    id: "ddaa",
    author: {
      id: "bot",
      name: "Bot",
    },
    content: "Hi there! It seems like you might have a question or need help with something. Could you clarify what you're looking for? 😊",
    datetime: (new Date(2024, 10, 27, 14, 46)).toUTCString(),
  },
  {
    id: "n3lnk",
    author: {
      id: "me",
      name: "Julio V. Gambuto",
      profile: "https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnRvb24lMjBwcm9maWxlfGVufDB8fDB8fHww",
    },
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    datetime: (new Date(2025, 2, 16, 5, 34)).toUTCString(),
    status: "read",
    reactions: [{ key: "thumbs_up", emoji: "👀", count: "73" }, { key: "fire", emoji: "💯", count: "23" }, { key: "raising_hands", emoji: "🙌", count: "11" }, { key: "mind_blown", emoji: "🤯", count: "3" }],
    replies: 4,
    quoted: {
      id: "ddaa",
      author: {
        id: "bot",
        name: "Bot",
      },
      content: "Hi there! It seems like you might have a question or need help with something. Could you clarify what you're looking for? 😊",
      datetime: (new Date(2024, 10, 27, 14, 46)).toUTCString(),
    },
  },
  {
    id: "n3f9k",
    author: {
      id: "me",
      name: "Julio V. Gambuto",
      profile: "https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnRvb24lMjBwcm9maWxlfGVufDB8fDB8fHww",
    },
    content: "Expedita deleniti cum sapiente?",
    datetime: (new Date(2025, 2, 16, 5, 34)).toUTCString(),
    starred: true,
    pinned: true,
    reactions: [{ key: "laughing", emoji: "🤣", count: 9 }],
    media: [
      // {
      //   id: "mdump89d",
      //   src: "https://images.unsplash.com/photo-1769937060137-22671294c3cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      //   type: "image",
      //   name: "blossom-landscape.jpg",
      // },
      {
        id: "auods7ds23",
        src: "https://images.unsplash.com/photo-1672036855093-eb274a6f2507?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGdsaXR0ZXIlMjBleHBsb3Npb258ZW58MHx8MHx8fDA%3D",
        type: "image",
        name: "lanterns.webp",
      },
    ],
  },
  {
    id: "ffd8f9f",
    author: {
      id: "system",
    },
    content: "Alice joined the chat",
    datetime: (new Date(2025, 2, 16, 5, 34)).toUTCString(),
  },
  {
    id: "v8vc7",
    author: {
      id: "system",
    },
    content: "Martin joined the chat",
    datetime: (new Date(2025, 2, 16, 5, 34)).toUTCString(),
  },
  {
    id: "fd8fd",
    author: {
      id: "alice",
      name: "Alice",
      profile: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60",
    },
    content: "Hey, did you check the new API docs?",
    datetime: (new Date(2025, 2, 17, 15, 34)).toUTCString(),
    status: "read",
    starred: true,
    media: [{
      id: "random_audio",
      name: "gamelan-bass-groove.wav.mp3",
      src: "https://sampleswap.org/samples-ghost/REMIXABLE%20COLLECTIONS/078%20gamelon%20bass%20groove/4249[kb]078_gamelan-bass-groove.wav.mp3",
      type: "audio",
    }]
  },
  {
    id: "vc89vc",
    author: {
      id: "Martin",
      name: "Martin",
      profile: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60",
    },
    content: "Yes, looks good. We can start integrating the endpoint tomorrow.",
    datetime: (new Date(2025, 2, 17, 15, 41)).toUTCString(),
    status: "read",
    replies: 16,
    pinned: true,
    media: [{
      id: "vsi798",
      name: "blue-glitter-particle-explosion-abstract-light-burst-background-animation-video-purple.webm",
      src: "https://www.shutterstock.com/shutterstock/videos/3922523297/preview/stock-footage--k-blue-glitter-particle-explosion-abstract-light-burst-background-animation-video-purple.webm",
      type: "video",
      thumbnails: [{ id: "vtn34", src: "/assets/video-thumbnail-1.png", duration: 14, name: "blue-glitter-particle-explosion-abstract-light-burst-background-animation-video-purple.webm" }]
    }],
    quoted: {
      id: "fd8fd",
      author: {
        id: "alice",
        name: "Alice",
        profile: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60",
      },
      content: "Hey, did you check the new API docs?",
      datetime: (new Date(2025, 2, 17, 15, 34)).toUTCString(),
    },
  },
  {
    id: "ds90",
    author: {
      id: "bot",
      name: "Bot",
    },
    content: "Labore sit iste explicabo, et hic voluptate eius fuga recusandae fugiat iusto optio porro in. Expedita deleniti cum sapiente? Sit enim, modi alias dolor veritatis aut porro velit adipisci voluptate, maiores odit!\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    datetime: (new Date(2025, 5, 28, 6, 17)).toUTCString(),
    reactions: [{ key: "thumbs_up", emoji: "👍️", count: "162" }, { key: "heart", emoji: "❤️", count: 57 }, { key: "fire", emoji: "🔥", count: "23" }, { key: "raising_hands", emoji: "🙌", count: "15" }, { key: "mind_blown", emoji: "🤯", count: "9" }],
  },
  {
    id: "fdio23",
    author: {
      id: "john",
      name: "John",
      profile: "https://images.unsplash.com/photo-1718391963402-e2011890093f?q=80&w=687&auto=format&fit=crop",
    },
    content: "Hi there!",
    datetime: (new Date(2025, 5, 28, 6, 18)).toUTCString(),
    pinned: true,
  },
  {
    id: "ds78",
    author: {
      id: "john",
      name: "John",
      profile: "https://images.unsplash.com/photo-1718391963402-e2011890093f?q=80&w=687&auto=format&fit=crop",
    },
    content: "How are you?",
    datetime: (new Date(2025, 5, 28, 6, 18)).toUTCString(),
    media: [
      // {
      //   id: "auods7ds",
      //   src: "https://images.unsplash.com/photo-1672036855093-eb274a6f2507?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGdsaXR0ZXIlMjBleHBsb3Npb258ZW58MHx8MHx8fDA%3D",
      //   type: "image",
      //   name: "lanterns.webp"
      // },
      {
        id: "mfd89fd",
        src: "https://images.unsplash.com/photo-1767431199061-3237ddd5de9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
        type: "image",
        name: "landscape.png",
      },
      {
        id: "mdump89d2",
        src: "https://images.unsplash.com/photo-1598476543599-72c8a60894d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHJlZHxlbnwwfHwwfHx8MA%3D%3D",
        type: "image",
      },
      {
        id: "m8f8f8f",
        src: "https://images.unsplash.com/photo-1772211506168-1cbfcb361be8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D",
        type: "image",
        name: "rocks-on-table.jpg",
      },
      {
        id: "m3f3f6",
        src: "https://images.unsplash.com/photo-1771255217927-c231e19812e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D",
        type: "image",
      },
      {
        id: "m43fm",
        src: "https://images.unsplash.com/photo-1769937060137-22671294c3cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
        type: "image",
      },
      {
        id: "mp80ds09",
        src: "/assets/sample-local-pdf.pdf",
        name: "ADA Health History.pdf",
        size: 899150,
        type: "pdf",
      },
      {
        id: "supersupersup",
        src: "/assets/dummy-md-file.md",
        name: "dummy-md-file.md",
        size: 12,
        type: "md",
      }
    ]
  },
  {
    id: "ff8fcx7",
    author: {
      id: "me",
      name: "Julio V. Gambuto",
      profile: "https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnRvb24lMjBwcm9maWxlfGVufDB8fDB8fHww",
    },
    content: "Verify these files",
    datetime: (new Date(2025, 5, 28, 6, 23)).toUTCString(),
    media: [
      {
        id: "ma80ds09",
        src: "https://sampleswap.org/samples-ghost/VOCAL%20ACAPELLAS/Snowflake/9218[kb]snowflake-In-Peace-cc-by.mp3.mp3",
        type: "audio",
        duration: 0,
        status: "failed",
      },
      {
        id: "mv80ds09",
        name: "big_buck_bunny_720p_surround.mp4",
        src: "https://www.pexels.com/download/video/7213891/",
        duration: 597,
        thumbnails: [
          { id: "tnv1", src: "/assets/video-thumbnail-2.png", name: "big_buck_bunny_720p_surround.mp4", duration: 597, },
        ],
        type: "video",
      },
      {
        id: "mp80ds092",
        src: "/assets/sample-pdf.pdf",
        name: "sample-local.pdf",
        size: 899150,
        type: "pdf",
        status: "uploading",
      },
      {
        id: "mz80ds09",
        src: "/assets/sample-zip-file.zip",
        name: "rss(1).zip",
        size: 353540,
        type: "zip",
        status: "failed",
      },
    ]
  },
  {
    id: "ds90me",
    author: {
      id: "me",
      name: "Julio V. Gambuto",
    },
    content: "Contrary to popular belief, Lorem Ipsum is not simply random text.\nIt has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\nIt uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    datetime: (new Date(2025, 5, 29, 14, 17)).toUTCString(),
    status: "failed",
  }
];


export const dummyMembers = [
  {
    id: "1", name: "Julio Vincent Gambuto", email: "lopez_tk88@outlook.com", role: "owner",
    profile: "https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnRvb24lMjBwcm9maWxlfGVufDB8fDB8fHww",
  },
  {
    id: "2", name: "John Snow", email: "lucy.g22@yahoo.com", role: "admin",
    profile: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "3", name: "Ethan Brooks", email: "liam.baker@example.com", role: "member",
    profile: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "4", name: "Amelia Green", email: "isabella.ward@example.com", role: "member",
    profile: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "5", name: "Michael", email: "c.rivera84@gmail.com", role: "member",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop",
  },
  {
    id: "6", name: "Leo Gonzalez", email: "noah.mitchell@example.com", role: "member",
    profile: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1631&auto=format&fit=crop",
  },
  {
    id: "7", name: "Emma Hill", email: "sophia_p29@icloud.com", role: "member",
    profile: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=687&auto=format&fit=crop",
  },

  {
    id: "8", name: "Lela Glover", email: "lelaglover46@aol.com", role: "member",
    profile: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "9", name: "Carlos Rivera", email: "c.rivera84@gmail.com", role: "member",
    profile: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop",
  },
  {
    id: "10", name: "Sophia Patel", email: "sophia_p29@icloud.com", role: "member",
    profile: "https://images.unsplash.com/photo-1623184663796-f0eb7e46d6ab?q=80&w=1112&auto=format&fit=crop",
  },
  {
    id: "11", name: "Henry Thompson", email: "hthompson52@comcast.net", role: "member",
    profile: "https://images.unsplash.com/flagged/photo-1573603867003-89f5fd7a7576?q=80&w=746&auto=format&fit=crop",
  },
  {
    id: "12", name: "Mia Chen", email: "miac_041@gmail.com", role: "member",
    profile: "https://images.unsplash.com/photo-1718391963402-e2011890093f?q=80&w=687&auto=format&fit=crop",
  },
];
