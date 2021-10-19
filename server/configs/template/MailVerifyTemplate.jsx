const { View } = require("grandjs");

const MailVerifyTemplate = ({ displayName, verifyUrl }) => {
  const style = {
    body: {
      backgroundColor: "#e7e7e7",
      padding: "20px 30px"
    },
    container: {
      minWidth: '320px',
      width: '100%',
      height: 'auto'
    },
    headerLogo: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    content: {
      marginTop: "20px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    verifyBtn: {
      marginTop: "25px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      marginTop: "20px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
  }
  return (
    <body style={style.body}>
    <div style={style.container}>
      {/*logo header*/}
      <div style={style.headerLogo}>
        <div style="width: 100%; text-align: center">
          <img
            src="cid:tech-social-logo"
            alt="tech-social-logo"
          />
          <h1
            style="
            argin: 0px;
            line-height: 140%;
            text-align: center;
            word-wrap: break-word;
            font-weight: normal;
            font-family: arial, helvetica, sans-serif;
            font-size: 16px;
            margin-bottom: 0;
          "
          >
            Welcome to Tech Social
          </h1>
        </div>
      </div>
      {/*/logo header*/}

      {/*content*/}
      <div style={style.content}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <p
            style="
            line-height: 140%;
            word-wrap: break-word;
            font-weight: normal;
            font-family: arial, helvetica, sans-serif;
            font-size: 18px;
          "
          >
            Hi {displayName},
          </p>
          <p
            style="
            margin: 20px 0;
            line-height: 140%;
            word-wrap: break-word;
            font-weight: normal;
            font-family: arial, helvetica, sans-serif;
            font-size: 18px;
          "
          >
            Please confirm that you want to use this as your Tech Social account email address.
          </p>
          <p
            style="
            margin: 0px;
            line-height: 140%;
            word-wrap: break-word;
            font-weight: normal;
            font-family: arial, helvetica, sans-serif;
            font-size: 18px;
          "
          >
            This link will expire in 2 hours and can only be used once.
          </p>
        </div>
      </div>
      {/*/content*/}

      {/*verify btn*/}
      <div style={style.verifyBtn}>
        <div style="width: 100%; text-align: center">
          <a
            href={verifyUrl}
            target="_blank"
            style="
            font-family: arial, helvetica, sans-serif;
            cursor: pointer;
            padding: 10px;
            background-color: #0275b1;
            text-decoration: none;
            color: #fff;
            border-radius: 4px;
          "
          >Verify your account</a>
        </div>
      </div>
      {/*/verify btn*/}

      {/*footer*/}
      <div style={style.footer}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <p
            style="
            margin: 0px;
            line-height: 140%;
            word-wrap: break-word;
            font-weight: normal;
            font-family: arial, helvetica, sans-serif;
            font-size: 18px;
          "
          >
            The Tech Social Team
          </p>
          <p
            style="
            margin-top: 20px;
            margin-bottom: 0;
            line-height: 140%;
            word-wrap: break-word;
            font-weight: normal;
            font-family: arial, helvetica, sans-serif;
            font-size: 13px;
            font-style: italic;
            color: #95a5a6;
          "
          >
            If you did not make this request, you can safely ignore this email.
          </p>
        </div>
      </div>
      {/*/footer*/}
    </div>
    </body>
  )
}

module.exports = MailVerifyTemplate;
