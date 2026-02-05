import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LaTeXRenderer } from './src/components/LaTeXRenderer';

const LATEX_EXPRESSIONS = [
  '\\frac{a}{b}',
  'x^2 + y^2 = z^2',
  '\\sqrt{x + y}',
  '\\int_0^1 x^2 dx',
  '\\sum_{i=1}^{n} i',
  '\\lim_{x \\to \\infty} f(x)',
  '\\frac{d}{dx} x^n = nx^{n-1}',
  '\\alpha + \\beta = \\gamma',
  '\\pi \\approx 3.14159',
  'e^{i\\pi} + 1 = 0',
  '\\sin^2(x) + \\cos^2(x) = 1',
  '\\frac{1}{\\sqrt{2\\pi}} e^{-x^2/2}',
  '\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\epsilon_0}',
  'E = mc^2',
  '\\Delta x \\Delta p \\geq \\frac{\\hbar}{2}',
  '\\hat{H}\\psi = E\\psi',
  '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
  '\\sum_{k=0}^{\\infty} \\frac{x^k}{k!} = e^x',
  '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}',
  '\\mathbb{P}(A \\cap B) = \\mathbb{P}(A) \\cdot \\mathbb{P}(B|A)',
  '\\mu = \\frac{1}{n} \\sum_{i=1}^{n} x_i',
  '\\sigma^2 = \\frac{1}{n} \\sum_{i=1}^{n} (x_i - \\mu)^2',
  '\\lim_{n \\to \\infty} (1 + \\frac{1}{n})^n = e',
  '\\int \\frac{1}{x} dx = \\ln|x| + C',
  '\\frac{d}{dx} \\sin(x) = \\cos(x)',
  '\\frac{d}{dx} e^x = e^x',
  'F = ma',
  '\\frac{1}{2}mv^2 + mgh = E',
  'PV = nRT',
  '\\Delta G = \\Delta H - T\\Delta S',
];

function App() {
  const [showTesting, setShowTesting] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!input.startsWith('$') || !input.endsWith('$')) {
      setError('Invalid: LaTeX must start and end with $');
      setResult('');
    } else {
      setError('');
      setResult(input);
    }
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.item}>
      <Text style={styles.num}>#{index + 1}</Text>
      <Text style={styles.code}>{item}</Text>
      <View style={styles.box}>
        <LaTeXRenderer latex={item} style={styles.view} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LaTeX Renderer</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowTesting(!showTesting)}>
        <Text style={styles.buttonText}>{showTesting ? 'Home' : 'Testing'}</Text>
      </TouchableOpacity>

      {!showTesting ? (
        <View style={styles.main}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="$\\frac{a}{b}$"
            placeholderTextColor="#999"
            multiline
          />

          {error !== '' && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          {result !== '' && (
            <View style={styles.resultBox}>
              <Text style={styles.label}>Result:</Text>
              <View style={styles.box}>
                <LaTeXRenderer latex={result} style={styles.view} />
              </View>
            </View>
          )}
        </View>
      ) : (
        <FlatList
          data={LATEX_EXPRESSIONS}
          renderItem={renderItem}
          keyExtractor={(_, i) => `${i}`}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    minHeight: 60,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#000',
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  errorBox: {
    borderWidth: 1,
    padding: 10,
  },
  main: {
    marginTop: 16,
  },
  resultBox: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  num: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  code: {
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  list: {
    paddingVertical: 16,
  },
  item: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  box: {
    borderWidth: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  view: {
    width: '100%',
    height: '100%',
  },
});


export default App;
