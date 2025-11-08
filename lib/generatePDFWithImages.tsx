import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer';
import products from '@/data/products.json';
import clients from '@/data/clients.json';

// Helper function to convert local paths to absolute URLs
function getImageUrl(path: string) {
  // Handle empty or invalid paths
  if (!path || path.trim() === '') {
    return null;
  }
  
  // Already an absolute URL
  if (path.startsWith('http')) {
    return path;
  }
  
  // Convert local paths to absolute URLs
  if (path.startsWith('/')) {
    return `https://webutsav.com${path}`;
  }
  
  // For relative paths, prepend the base URL
  return `https://webutsav.com/${path}`;
}

const styles = StyleSheet.create({
  page: { 
    padding: 30, 
    fontSize: 9, 
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff'
  },
  // Headers
  h1: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  h2: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 8,
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  h3: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginBottom: 6,
    color: '#0f172a',
    textTransform: 'uppercase'
  },
  // Text
  p: { 
    marginVertical: 3,
    lineHeight: 1.5,
    color: '#334155',
    textAlign: 'justify'
  },
  pSmall: {
    fontSize: 8,
    marginVertical: 2,
    lineHeight: 1.4,
    color: '#475569'
  },
  // Layout
  section: {
    marginBottom: 12,
    paddingTop: 10,
    borderTop: '3px solid #2563eb'
  },
  sectionAlt: {
    marginBottom: 12,
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
    borderTop: '3px solid #2563eb'
  },
  row: { 
    flexDirection: 'row', 
    gap: 8,
    marginBottom: 8
  },
  col2: {
    flex: 1
  },
  // Cards
  card: { 
    border: '1px solid #e2e8f0',
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#ffffff'
  },
  cardHeader: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: 5,
    marginBottom: 6,
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  // Product specific
  productCard: {
    border: '1px solid #e2e8f0',
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    width: '48%'
  },
  productImage: {
    width: 40,
    height: 40,
    marginBottom: 4,
    alignSelf: 'center',
    objectFit: 'contain'
  },
  productTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#0f172a'
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 3,
    fontSize: 8
  },
  bulletPoint: {
    color: '#2563eb',
    marginRight: 4,
    fontWeight: 'bold'
  },
  // Client card
  clientCard: {
    border: '1px solid #e2e8f0',
    padding: 6,
    width: '30%',
    marginBottom: 6,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    minHeight: 60
  },
  clientLogo: {
    width: 30,
    height: 30,
    marginBottom: 3,
    objectFit: 'contain'
  },
  clientName: {
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#334155'
  },
  // Badge
  badge: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: 3,
    paddingHorizontal: 6,
    fontSize: 7,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginRight: 4,
    marginBottom: 4
  },
  // Footer
  footer: { 
    marginTop: 15,
    paddingTop: 12,
    borderTop: '3px solid #2563eb',
    backgroundColor: '#1e293b',
    padding: 15,
    color: '#e2e8f0'
  },
  footerText: {
    fontSize: 8,
    color: '#cbd5e1',
    marginBottom: 3
  },
  footerTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
    textTransform: 'uppercase'
  },
  // Divider
  divider: { 
    height: 2, 
    backgroundColor: '#2563eb',
    marginVertical: 6,
    width: 50
  },
  // Cover page
  coverPage: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  coverImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  coverOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  coverSubtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 30
  },
  // Combined sections
  combinedSection: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0'
  },
  // No image placeholder
  noImage: {
    width: 40,
    height: 40,
    marginBottom: 4,
    alignSelf: 'center',
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noImageText: {
    fontSize: 6,
    color: '#94a3b8',
    textAlign: 'center'
  }
});

export function PortfolioPDFWithImages() {
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Image 
          src="https://webutsav.com/images/cover%20photo.png" 
          style={styles.coverImage}
        />
        <View style={styles.coverOverlay} />
      </Page>

      {/* Page 1: Company Introduction & Team */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.h1}>WebUtsav Pvt. Ltd.</Text>
          <View style={styles.divider} />
          <Text style={styles.p}>
            WebUtsav Pvt. Ltd. is a full-stack IT company providing software development, digital marketing, and cloud services. We build scalable products and measurable campaigns that help businesses grow. Our mission is to deliver innovative, scalable, and impactful tech solutions for businesses globally through digital empowerment and smart technology.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.h1}>About Our Team</Text>
          <View style={styles.divider} />
        </View>
        
        <View style={styles.row}>
          <View style={[styles.card, styles.col2]}>
            <Text style={styles.h3}>IT Development Team</Text>
            <Text style={styles.pSmall}>
              Our technical team comprises experienced developers and engineers specializing in modern web and mobile technologies. We leverage cutting-edge frameworks and cloud infrastructure to build robust, scalable solutions.
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              <Text style={styles.badge}>REACT</Text>
              <Text style={styles.badge}>FLUTTER</Text>
              <Text style={styles.badge}>NODE.JS</Text>
              <Text style={styles.badge}>AWS</Text>
              <Text style={styles.badge}>DEVOPS</Text>
            </View>
          </View>
          
          <View style={[styles.card, styles.col2]}>
            <Text style={styles.h3}>Marketing Team</Text>
            <Text style={styles.pSmall}>
              Our digital marketing experts drive measurable growth through data-driven strategies. From search engine optimization to paid advertising campaigns, we deliver results that matter to your business.
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              <Text style={styles.badge}>SEO</Text>
              <Text style={styles.badge}>PPC</Text>
              <Text style={styles.badge}>SOCIAL MEDIA</Text>
              <Text style={styles.badge}>ANALYTICS</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 2: Our Expertise */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.h1}>Our Expertise</Text>
          <View style={styles.divider} />
          <Text style={styles.pSmall}>Comprehensive technology solutions across the full development lifecycle</Text>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.card, styles.col2]}>
            <Text style={styles.h3}>Full-Stack Development</Text>
            <Text style={styles.pSmall}>
              End-to-end web application development using React, Next.js, Node.js, and modern databases. Scalable architecture and clean code practices.
            </Text>
          </View>
          <View style={[styles.card, styles.col2]}>
            <Text style={styles.h3}>Mobile Apps</Text>
            <Text style={styles.pSmall}>
              Cross-platform mobile applications with Flutter and React Native. Native performance with beautiful, intuitive user interfaces.
            </Text>
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.card, styles.col2]}>
            <Text style={styles.h3}>Cloud & DevOps</Text>
            <Text style={styles.pSmall}>
              AWS infrastructure setup, CI/CD pipelines, containerization with Docker, and automated deployment strategies for reliability.
            </Text>
          </View>
          <View style={[styles.card, styles.col2]}>
            <Text style={styles.h3}>UI/UX Design</Text>
            <Text style={styles.pSmall}>
              User-centered design with modern interfaces. Wireframing, prototyping, and design systems that enhance user experience.
            </Text>
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.card, styles.col2]}>
            <Text style={styles.h3}>WhatsApp CRM</Text>
            <Text style={styles.pSmall}>
              Automated customer engagement through WhatsApp Business API. Campaign management, chatbots, and CRM integration.
            </Text>
          </View>
          <View style={[styles.card, styles.col2]}>
            <Text style={styles.h3}>Digital Marketing</Text>
            <Text style={styles.pSmall}>
              SEO optimization, Google Ads, social media marketing, and content strategy. Data-driven campaigns with measurable ROI.
            </Text>
          </View>
        </View>
      </Page>

      {/* Page 3: Products (All products on one page) */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.h1}>Our Products</Text>
          <View style={styles.divider} />
          <Text style={styles.pSmall}>Innovative software solutions built for real-world business challenges</Text>
        </View>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {products.map((product: any) => {
            const imageUrl = getImageUrl(product.logo);
            
            return (
              <View key={product.slug} style={styles.productCard}>
                {imageUrl ? (
                  <Image src={imageUrl} style={styles.productImage} />
                ) : (
                  <View style={styles.noImage}>
                    <Text style={styles.noImageText}>No Image</Text>
                  </View>
                )}
                <Text style={styles.cardHeader}>{product.subtitle}</Text>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.pSmall}>{product.description}</Text>
                <View style={{ marginTop: 4 }}>
                  {product.bullets.slice(0, 3).map((bullet: string, i: number) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={{ fontSize: 7, color: '#475569', flex: 1 }}>{bullet}</Text>
                    </View>
                  ))}
                </View>
                {product.href && (
                  <Text style={{ fontSize: 6, color: '#2563eb', marginTop: 3 }}>
                    {product.href.replace('https://', '')}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </Page>

      {/* Page 4: Clients & Company Details */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.h1}>Our Clients</Text>
          <View style={styles.divider} />
          <Text style={styles.pSmall}>Trusted by leading businesses across industries</Text>
        </View>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {clients.map((client: any) => {
            const imageUrl = getImageUrl(client.logo);
            
            return (
              <View key={client.title} style={styles.clientCard}>
                {imageUrl ? (
                  <Image src={imageUrl} style={styles.clientLogo} />
                ) : (
                  <View style={styles.noImage}>
                    <Text style={styles.noImageText}>No Image</Text>
                  </View>
                )}
                <Text style={styles.clientName}>{client.title}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View style={styles.row}>
            <View style={styles.col2}>
              <Text style={styles.footerTitle}>WebUtsav Pvt. Ltd.</Text>
              <Text style={styles.footerText}>
                Address: Office No. 115, City Vista, Kharadi, Pune, Maharashtra 411014
              </Text>
              <Text style={styles.footerText}>GST No.: 27AAACW1234Z1ZP</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.footerTitle}>Contact Details</Text>
              <Text style={styles.footerText}>Email: info@webutsav.com</Text>
              <Text style={styles.footerText}>Phone: +91 87669 22792</Text>
              <Text style={styles.footerText}>Website: www.webutsav.com</Text>
            </View>
          </View>
          <View style={{ marginTop: 15, paddingTop: 10, borderTop: '1px solid #475569', textAlign: 'center' }}>
            <Text style={{ fontSize: 8, color: '#94a3b8' }}>
              © {new Date().getFullYear()} WebUtsav Pvt. Ltd. All rights reserved.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}